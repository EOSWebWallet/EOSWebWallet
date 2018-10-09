import { Component } from '@angular/core'
import { Permission } from '../../models/permission.model'
import { LocalStorage } from 'ngx-webstorage'
import { LoginState } from '../../models/login-state.model'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-unlink-permission',
  templateUrl: './unlink-permission.component.html',
  styleUrls: ['./unlink-permission.component.scss',
    '../../../button.styles.scss',
    '../../../input.style.scss',
    '../../../page-container.styles.scss'
  ]
})
export class UnlinkPermissionComponent {
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  isLoggedIn: LoginState
  @LocalStorage()
  buttonUsed: boolean

  model: Permission
  network: any
  eos: any

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private translate: TranslateService
  ) {
    this.model = new Permission('','','')
    this.buttonUsed = false
  }

  async unlink () {
    this.buttonUsed = true
    const options = { authorization: [`${this.accountName}@${this.permission}`] }
    try {
      if (!this.eos) {
        let obj = await this.loginService.setupEos()
        this.eos = obj.eos
        this.network = obj.network
      }
      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(), await this.translate.get('dialogs.scatter-should-appear').toPromise())
      await this.eos.transaction(tr => {
        tr.unlinkauth({
          account: this.accountName,
          code: this.model.code,
          type: this.model.type
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
