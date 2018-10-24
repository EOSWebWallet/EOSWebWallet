import { Component } from '@angular/core'
import { LoginService, DialogsService, ButtonBlockService, FactoryPluginService } from '../../services'
import { TranslateService } from '@ngx-translate/core'
import { LocalStorage } from 'ngx-webstorage'

@Component({
  selector: 'app-deploy-abi',
  templateUrl: './deploy-abi.component.html',
  styleUrls: [
    './deploy-abi.component.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})
export class DeployAbiComponent {
  @LocalStorage()
  buttonUsed: boolean

  account: string
  abi: string
  network: any
  eos: any
  fileBase64: any

  constructor (
    public loginService: LoginService,
    private translate: TranslateService,
    private dialogsService: DialogsService,
    private factoryPluginService: FactoryPluginService,
    public buttonBlockService: ButtonBlockService) {
    this.buttonUsed = false
  }

  async deployAbi () {
    this.buttonUsed = true
    if (this.account) {

      if (!this.eos) {
        let obj = await this.loginService.setupEos()
        this.eos = obj.eos
        this.network = obj.network
      }

      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
       await this.translate.get(`dialogs.${this.factoryPluginService.currentPlugin.name}-should-appear`).toPromise())

      try {
        await this.eos.setabi(this.account.toLowerCase(), JSON.parse(this.abi))
        this.dialogsService.showSuccess(await this.translate.get('common.operation-completed').toPromise())
      } catch (error) {
        if (error.code === 402) {
          this.dialogsService.showInfo(error.message)
        } else {
          this.dialogsService.showFailure(error)
        }
      }
    }
    this.buttonUsed = false
  }

  async attachFile (event, file) {
    let input = event.target
    const reader = new FileReader()

    let self = this
    reader.onload = function () {
      self.fileBase64 = reader.result.slice(reader.result.indexOf(';base64,')).slice(8);
      (document.getElementById('abi') as HTMLInputElement).value = atob(self.fileBase64)
    }
    reader.readAsDataURL(input.files[0])
  }
}
