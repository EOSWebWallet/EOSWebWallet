import { Component } from '@angular/core'
import { Delegate } from '../../models/delegate.model'
import { LocalStorage } from 'ngx-webstorage'
import { LoginState } from '../../models/login-state.model'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { TranslateService } from '@ngx-translate/core'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-delegate',
  templateUrl: './delegate.component.html',
  styleUrls: [
    './delegate.component.scss',
    '../../../button.styles.scss',
    '../../../input.style.scss',
    '../../../page-container.styles.scss',
    '../../../icon.styles.scss'
  ]
})
export class DelegateComponent {

  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  isLoggedIn: LoginState
  @LocalStorage()
  buttonUsed: boolean
  faQuestionCircle = faQuestionCircle

  model: Delegate
  network: any
  eos: any

  accountMissing: any

  constructor (
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    public buttonBlockService: ButtonBlockService
  ) {
    this.model = new Delegate()
    this.model.transfer = false
    this.buttonUsed = false
  }

  async delegateBandwidth (model) {
    try {
      if (!this.eos) {
        let obj = await this.loginService.setupEos()
        this.eos = obj.eos
        this.network = obj.network
      }
      const options = { authorization: [`${this.accountName}@${this.permission}`] }

      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
       await this.translate.get('dialogs.scatter-should-appear').toPromise())
      await this.eos.transaction(tr => {
        tr.delegatebw({
          from: model.stakeOwner,
          receiver: model.recipient.toLowerCase(),
          stake_net_quantity: String(model.net.toFixed(4)) + ' EOS',
          stake_cpu_quantity: String(model.cpu.toFixed(4)) + ' EOS',
          transfer: Number(model.transfer | 0)
        }, options)
      })
      this.dialogsService.showSuccess(await this.translate.get('undelegate.operation-completed').toPromise())
    } catch (error) {
      if (error.type === 'account_missing') {
        this.dialogsService.showFailure(await this.translate.get('undelegate.account-missing').toPromise())
      } else {
        if (error.code === 402) {
          this.dialogsService.showInfo(error.message)
        } else {
          this.dialogsService.showFailure(error)
        }
      }
    }
    this.buttonUsed = false
  }

  onSubmit () {
    this.buttonUsed = true
    this.model.stakeOwner = this.accountName
    this.delegateBandwidth(this.model)
  }
}
