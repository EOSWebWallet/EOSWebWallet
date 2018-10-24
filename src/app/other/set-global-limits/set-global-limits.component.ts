import { Component } from '@angular/core'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { LocalStorage } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-set-global-limits',
  templateUrl: './set-global-limits.component.html',
  styleUrls: [
    './set-global-limits.component.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})
export class SetGlobalLimitsComponent {
  cpu: number
  network: any
  eos: any

  @LocalStorage()
  buttonUsed: boolean
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  currentPluginName: string

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private translate: TranslateService
  ) {
    this.buttonUsed = false
  }

  async setGlobalLimits () {
    this.buttonUsed = false

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
            name: 'setglimits',
            authorization: [{ actor: this.accountName, permission: this.permission }],
            data: {
              cpu_usec_per_period: this.cpu
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
