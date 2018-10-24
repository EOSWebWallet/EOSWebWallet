import { Component } from '@angular/core'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { LocalStorage } from 'ngx-webstorage'
import { SetParams } from '../../models/set-params.model'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-set-params',
  templateUrl: './set-params.component.html',
  styleUrls: ['./set-params.component.scss', '../../../button.styles.scss', '../../../page-container.styles.scss']
})
export class SetParamsComponent {
  @LocalStorage()
  buttonUsed: boolean
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  currentPluginName: string

  model: SetParams
  network: any
  eos: any

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private translate: TranslateService) {
    this.buttonUsed = false
    this.model = (this.loginService.loggedIn())
      ? new SetParams(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
      : new SetParams(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
  }

  async onSubmit () {
    this.buttonUsed = true

    let obj = await this.loginService.setupEos()
    this.eos = obj.eos
    this.network = obj.network

    // TODO skip values with 0 ?
    this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
     await this.translate.get(`dialogs.${this.currentPluginName}-should-appear`).toPromise())

    try {
      await this.eos.transaction({
        actions: [
          {
            account: this.accountName,
            name: 'setparams',
            authorization: [{ actor: this.accountName, permission: this.permission }],
            data: {
              params: this.model
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
