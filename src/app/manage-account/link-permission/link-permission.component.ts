import { Component, OnInit } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'
import { LoginState } from '../../models/login-state.model'
import { LinkPermission } from '../../models/link-permission.model'
import { LoginService } from '../../services/login.service'
import { DialogsService } from '../../services/dialogs.service'
import { ButtonBlockService } from '../../services/button-block.service'

@Component({
  selector: 'app-link-permission',
  templateUrl: './link-permission.component.html',
  styleUrls: [
    './link-permission.component.scss',
    '../../../button.styles.scss',
    '../../../input.style.scss',
    '../../../page-container.styles.scss'
  ]
})
export class LinkPermissionComponent implements OnInit {
  @LocalStorage()
  isLoggedIn: LoginState
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  buttonUsed: boolean

  model: LinkPermission
  network: any
  eos: any

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private translate: TranslateService
  ) {
    this.model = new LinkPermission('', '', '', '')
    this.buttonUsed = false
  }

  ngOnInit () {
    this.loginService.setupEos().then(obj => {
      this.eos = obj.eos
      this.network = obj.network
    }).catch(e => console.warn('EOS ERR', e))
  }

  async link () {
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
        tr.linkauth({
          account: this.accountName, // account_name
          code: this.model.code, // type is account_name
          type: this.model.type, // action_name
          requirement: this.model.requirement // permission_name
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
