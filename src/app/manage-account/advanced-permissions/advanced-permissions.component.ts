import { Component } from '@angular/core'
import { AdvensedPermissions, Authorities } from '../../models/advanced-permissions.model'
import { LocalStorage } from 'ngx-webstorage'
import { LoginState } from '../../models/login-state.model'
import { LoginService } from '../../services/login.service'
import { DialogsService } from '../../services/dialogs.service'
import { TranslateService } from '@ngx-translate/core'
import { CryptoService } from '../../services/crypto.service'
import { ButtonBlockService } from '../../services/button-block.service'

@Component({
  selector: 'app-advanced-permissions',
  templateUrl: './advanced-permissions.component.html',
  styleUrls: ['./advanced-permissions.component.scss',
    '../../../button.styles.scss',
    '../../../input.style.scss',
    '../../../page-container.styles.scss'
  ]
})
export class AdvancedPermissionsComponent {

  @LocalStorage()
  isLoggedIn: LoginState
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  publicKey: string
  @LocalStorage()
  currentChainId: string
  @LocalStorage()
  buttonUsed: boolean

  authority: Authorities[]

  model: AdvensedPermissions
  network: any
  eos: any

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private translate: TranslateService,
    private dialogsService: DialogsService,
    private cryptoService: CryptoService
  ) {
    this.buttonUsed = false
    this.model = (loginService.loggedIn()) ? new AdvensedPermissions(1,'','',1) : new AdvensedPermissions(null,'','',null)
    this.authority = []
    this.authority.push(new Authorities(''))
    this.buttonUsed = false
  }

  addRow () {
    this.authority.push(new Authorities(''))
  }

  removeRow (index) {
    if (this.authority.length > 1 && index > 0) {
      this.authority.splice(index, 1)
    }
  }

  async updatePermissions () {
    this.buttonUsed = true
    let keys

    if (this.isLoggedIn === LoginState.publicKey) {
    
    let pubKey = await this.loginService.getPublicKey(this.publicKey)
      
      keys = [{ key: pubKey, weight: 1 }]
    } else {
      keys = []
    }

      // TODO FIX - same error like with setprods
      // Missing required accounts, repull the identity - with scatter
      // Transaction should have at least one required authority - with key
    try {
      for (let item of this.authority) {
        let auth = { authorization: [{ actor: this.accountName, permission: this.permission }], threshold: Number(this.model.threshold), accounts: [{permission: {actor: item.authority.split('@')[0],
          permission: item.authority.split('@')[1]}, weight: this.model.weight}], keys: keys }

        if (!this.eos) {
          let obj = await this.loginService.setupEos()
          this.eos = obj.eos
          this.network = obj.network
        }
        const options = { authorization: [`${this.accountName}@${this.permission}`] }

        this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
         await this.translate.get('dialogs.scatter-should-appear').toPromise())

        await this.eos.transaction({
          actions: [
            {
              account: 'eosio',
              name: 'updateauth',
              authorization: [{ actor: this.accountName, permission: this.permission }],
              data: {
                account: item.authority.split('@')[0],
                permission: this.model.permission,
                parent: this.model.parent,
                auth: auth
              }
            }
          ]
        }, options)
      }
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
    this.updatePermissions()
  }
}
