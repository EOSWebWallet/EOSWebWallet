import { Component } from '@angular/core'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { RegisterProxyInfo } from '../../models/register-proxy-info.model'
import { TranslateService } from '@ngx-translate/core'
import { LocalStorage } from 'ngx-webstorage'

@Component({
  selector: 'app-register-proxy-info',
  templateUrl: './register-proxy-info.component.html',
  styleUrls: [
    './register-proxy-info.component.scss',
    '../../../page-container.styles.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss'
  ]
})
export class RegisterProxyInfoComponent {
  model: RegisterProxyInfo
  network: any
  eos: any

  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  buttonUsed: boolean

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private translate: TranslateService
  ) {
    this.buttonUsed = false
    this.model = new RegisterProxyInfo('', '', '', '', '', '', '', '', '', '', '')
  }

  async registerProxyInfo () {

    const options = {
      broadcast: true,
      sign: true,
      authorization: [{ actor: this.accountName, permission: this.permission }]
    }

    try {
      let obj = await this.loginService.setupEos()
      this.eos = obj.eos
      this.network = obj.network
      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
       await this.translate.get('dialogs.scatter-should-appear').toPromise())

      await this.eos.transaction('regproxyinfo', accountInfo => {
        accountInfo.set({
          proxy: this.model.proxy.toLowerCase(),
          name: this.model.name.toLowerCase(),
          website: this.model.website,
          slogan: this.model.slogan,
          philosophy: this.model.philosophy,
          background: this.model.background,
          logo_256: this.model.logo_256,
          telegram: this.model.telegram,
          steemit: this.model.steemit,
          twitter: this.model.twitter,
          wechat: this.model.wechat
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

  onSubmit () {
    this.buttonUsed = true
    this.registerProxyInfo()
  }
}
