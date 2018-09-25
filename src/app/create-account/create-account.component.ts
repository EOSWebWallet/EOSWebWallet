import { Component } from '@angular/core'
import { Account } from '../models/account.model'
import { LocalStorage } from 'ngx-webstorage'
import { LoginState } from '../models/login-state.model'
import { LoginService, DialogsService, ButtonBlockService } from '../services'
import { TranslateService } from '@ngx-translate/core'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: [
    './create-account.component.scss',
    '../../input.style.scss',
    '../../button.styles.scss',
    '../../page-container.styles.scss',
    '../../icon.styles.scss'
  ]
})
export class CreateAccountComponent {
  faQuestionCircle = faQuestionCircle
  network: any
  eos: any
  scatter: any

  @LocalStorage()
  buttonUsed: boolean

  @LocalStorage()
  isLoggedIn: LoginState

  @LocalStorage()
  accountName: string

  model: Account

  constructor (
    public buttonBlockService: ButtonBlockService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    public loginService: LoginService
  ) {
    this.buttonUsed = false
    this.model = (this.loginService.loggedIn())
      ? new Account('', '', '', '', 0.001, 0.001, 8192, true)
      : new Account('', '', '', '', null, null, null, true)
  }

  loggedIn () {
    if (this.isLoggedIn != null && this.isLoggedIn !== LoginState.out) {
      return true
    } else {
      return false
    }
  }

  // under scatter works only with active key
  // works with owner or active when user is logged in with keys
  async createAccount (model) {
    this.buttonUsed = true
    const message = await this.translate.get('dialogs.scatter-should-appear').toPromise()
    const title = await this.translate.get('dialogs.transaction-wil-be-sent').toPromise()
    this.dialogsService.showSending(message, title)

    try {
      let obj = await this.loginService.setupEos()
      this.eos = obj.eos
      this.network = obj.network

      await this.eos.transaction(tr => {
        tr.newaccount({
          creator: model.owner.toLowerCase(),
          name: model.name.toLowerCase(),
          owner: model.ownerKey,
          active: model.activeKey
        })

        tr.buyrambytes({
          payer: model.owner.toLowerCase(),
          receiver: model.name.toLowerCase(),
          bytes: model.bytes
        })

        tr.delegatebw({
          from: model.owner.toLowerCase(),
          receiver: model.name.toLowerCase(),
          stake_net_quantity: String(model.netStake.toFixed(4)) + ' EOS',
          stake_cpu_quantity: String(model.cpuStake.toFixed(4)) + ' EOS',
          transfer: Number(model.transfer | 0)
        })
      })
      this.dialogsService.showSuccess(await this.translate.get('create-account.account-created').toPromise())
    } catch (err) {
      this.dialogsService.showFailure(err)
    }
    this.buttonUsed = false
  }

  async onSubmit () {
    await this.createAccount(this.model)
  }
}
