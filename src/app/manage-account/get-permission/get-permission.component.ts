import { Component, OnInit } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { LoginService } from '../../services/login.service'
import { DialogsService } from '../../services/dialogs.service'
import { TranslateService } from '@ngx-translate/core'
import { AccountService } from '../../services/account.service'
import { ButtonBlockService } from '../../services/button-block.service'

@Component({
  selector: 'app-get-permission',
  templateUrl: './get-permission.component.html',
  styleUrls: [
    './get-permission.component.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})
export class GetPermissionComponent implements OnInit {
  @LocalStorage()
  buttonUsed: boolean

  network: any
  eos: any

  permissions: string[]
  accountName: string

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private accountService: AccountService,
    private translate: TranslateService
  ) {
    this.buttonUsed = false
  }

  ngOnInit () {
  }

  async getPermissions () {
    this.buttonUsed = true
    try {
      let data = await this.accountService.findByName('{"account_name":"' + this.accountName.toLowerCase() + '"}').toPromise()
      if (!data) {
        this.dialogsService.showFailure('Account information not found')
        this.buttonUsed = false
        return
      }
      console.log(data.permissions)
      this.permissions = data.permissions.map(perm => perm.perm_name)
    } catch (error) {
      this.dialogsService.showFailure(error)
    }
    this.buttonUsed = false
  }
}
