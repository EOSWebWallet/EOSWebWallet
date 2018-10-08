import { Component } from '@angular/core'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { TranslateService } from '@ngx-translate/core'
import { LocalStorage } from 'ngx-webstorage'

@Component({
  selector: 'app-create-proxy',
  templateUrl: './create-proxy.component.html',
  styleUrls: [
    './create-proxy.component.scss',
    '../../../page-container.styles.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss'
  ]
})
export class CreateProxyComponent {
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  buttonUsed: boolean

  proxy: String
  network: any
  eos: any
  scatter: any

  constructor (
    public loginService: LoginService,
    public buttonBlockService: ButtonBlockService,
    private dialogsService: DialogsService,
    private translate: TranslateService
  ) {
    this.buttonUsed = false
  }

  async createProxy () {
    this.buttonUsed = true

    try {
      let obj = await this.loginService.setupEos()
      this.eos = obj.eos
      this.network = obj.network
      const options = { authorization: [`${this.accountName}@${this.permission}`] }

      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
       await this.translate.get('dialogs.scatter-should-appear').toPromise())

      await this.eos.transaction(tr => {
        tr.regproxy({
          proxy: this.proxy.toLowerCase(),
          isproxy: 1
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
