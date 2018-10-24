import { Component } from '@angular/core'
import { LoginService, DialogsService, CryptoService, ButtonBlockService } from '../../services'
import { LocalStorage } from 'ngx-webstorage'
import { SetAccountLimits } from '../../models/set-account-limits.model'
import { TranslateService } from '@ngx-translate/core'
import { LoginState } from '../../models/login-state.model'

@Component({
  selector: 'app-set-account-limits',
  templateUrl: './set-account-limits.component.html',
  styleUrls: [
    './set-account-limits.component.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})
export class SetAccountLimitsComponent {
  model: SetAccountLimits
  network: any
  eos: any

  @LocalStorage()
  buttonUsed: boolean
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  currentChainId: string
  @LocalStorage()
  isLoggedIn: LoginState
  @LocalStorage()
  publicKey: string
  @LocalStorage()
  currentPluginName: string

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private translate: TranslateService,
    private dialogsService: DialogsService,
    private cryptoService: CryptoService
  ) {
    this.buttonUsed = false
    this.model = (this.loginService.loggedIn())
      ? new SetAccountLimits(this.accountName, 0, 0, 0)
      : new SetAccountLimits(this.accountName, null, null, null)
  }

  async setAccountLimits () {
    this.buttonUsed = true

    let obj = await this.loginService.setupEos()
    this.eos = obj.eos
    this.network = obj.network

    this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
     await this.translate.get(`dialogs.${this.currentPluginName}-should-appear`).toPromise())

    try {
      await this.eos.transaction({
        actions: [
          {
            account: 'eosio',
            name: 'setalimits',
            authorization: [{ actor: this.accountName, permission: this.permission }],
            data: {
              account: this.model.account,
              ram_bytes: this.model.ram,
              net_weight: this.model.net,
              cpu_weight: this.model.cpu
            }
          }
        ]
      })
      this.dialogsService.showSuccess(await this.translate.get('common.operation-completed').toPromise())
    } catch (error) {
      if (error.code === 402) {
        this.dialogsService.showInfo(error.message)
      } else {
        this.dialogsService.showFailure(error)
      }
    }
    this.buttonUsed = false
  }
}
