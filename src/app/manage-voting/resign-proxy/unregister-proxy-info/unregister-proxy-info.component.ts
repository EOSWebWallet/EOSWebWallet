import { Component } from '@angular/core'
import { LoginService, DialogsService, ButtonBlockService } from '../../../services'
import { TranslateService } from '@ngx-translate/core'
import { LocalStorage } from 'ngx-webstorage'

@Component({
  selector: 'app-unregister-proxy-info',
  templateUrl: './unregister-proxy-info.component.html',
  styleUrls: [
    './unregister-proxy-info.component.scss',
    '../../../../input.style.scss',
    '../../../../button.styles.scss',
    '../../../../page-container.styles.scss'
  ]
})
export class UnregisterProxyInfoComponent {
  proxy: string
  network: any
  eos: any

  @LocalStorage()
  permission: string
  @LocalStorage()
  accountName: string
  @LocalStorage()
  buttonUsed: boolean
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

  async removeDetails () {
    this.buttonUsed = true

    try {
      let obj = await this.loginService.setupEos()
      this.eos = obj.eos
      this.network = obj.network

      const options = { authorization: [`${this.accountName}@${this.permission}`] }

      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
       await this.translate.get(`dialogs.${this.currentPluginName}-should-appear`).toPromise())

      await this.eos.transaction('regproxyinfo', accountInfo => {
        accountInfo.remove({
          proxy: this.proxy.toLowerCase()
        }, options)
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
