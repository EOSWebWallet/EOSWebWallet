import { Component } from '@angular/core'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { LocalStorage } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-set-privilege',
  templateUrl: './set-privilege.component.html',
  styleUrls: ['./set-privilege.component.scss',
    '../../../radiobutton.style.scss', '../../../page-container.styles.scss', '../../../button.styles.scss']
})
export class SetPrivilegeComponent {
  @LocalStorage()
  buttonUsed: boolean
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string

  isPriv: string
  network: any
  eos: any

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private translate: TranslateService
  ) {
    this.buttonUsed = false
    this.isPriv = '1'
  }

  async setPriv () {
    this.buttonUsed = true

    try {
      let obj = await this.loginService.setupEos()
      this.eos = obj.eos
      this.network = obj.network

      let options = {
        broadcast: true,
        sign: true,
        verbose: true,
        authorization: [{ actor: this.accountName, permission: this.permission }]
      }

      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
       await this.translate.get('dialogs.scatter-should-appear').toPromise())

      await this.eos.transaction({
        actions: [
          {
            account: 'eosio',
            name: 'setpriv',
            authorization: [{ actor: this.accountName, permission: this.permission }],
            data: {
              account: this.accountName,
              is_priv: Number(this.isPriv)
            }
          }
        ]
      }, options)
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
