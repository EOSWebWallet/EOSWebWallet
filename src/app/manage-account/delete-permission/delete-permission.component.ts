import { Component } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { LoginState } from '../../models/login-state.model'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-delete-permission',
  templateUrl: './delete-permission.component.html',
  styleUrls: ['./delete-permission.component.scss',
    '../../../button.styles.scss',
    '../../../input.style.scss',
    '../../../page-container.styles.scss'
  ]
})
export class DeletePermissionComponent {
  @LocalStorage()
  accountName: string

  @LocalStorage()
  isLoggedIn: LoginState

  @LocalStorage()
  buttonUsed: boolean

  network: any
  eos: any
  permission: string

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private translate: TranslateService,
    private dialogsService: DialogsService
  ) {
    this.permission = ''
    this.buttonUsed = false
  }

  async delete () {
    this.buttonUsed = true

    if (this.permission) {
      try {
        if (!this.eos) {
          let obj = await this.loginService.setupEos()
          this.eos = obj.eos
          this.network = obj.network
        }
        this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(), await this.translate.get('dialogs.scatter-should-appear').toPromise())
        await this.eos.transaction(tr => {
          tr.deleteauth({
            account: this.accountName,
            permission: this.permission
          })
        })
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
}
