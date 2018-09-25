import { Component } from '@angular/core'
import { Undelegate } from '../../models/undelegate.model'
import { LocalStorage } from 'ngx-webstorage'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { LoginState } from '../../models/login-state.model'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-undelegate',
  templateUrl: './undelegate.component.html',
  styleUrls: [
    './undelegate.component.scss',
    '../../../button.styles.scss',
    '../../../input.style.scss',
    '../../../page-container.styles.scss'
  ]
})
export class UndelegateComponent {

  @LocalStorage()
  accountName: string
  @LocalStorage()
  isLoggedIn: LoginState
  @LocalStorage()
  buttonUsed: boolean

  model: Undelegate
  network: any
  eos: any
  accountMissing: boolean

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
     private dialogsService: DialogsService,
    private translate: TranslateService
  ) {
    this.model = new Undelegate()
    this.buttonUsed = false
  }

  async undelegateBandwidth (model) {
    try {
      if (!this.eos) {
        let obj = await this.loginService.setupEos()
        this.eos = obj.eos
        this.network = obj.network
      }
      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(), await this.translate.get('dialogs.scatter-should-appear').toPromise())
      await this.eos.transaction(tr => {
        tr.undelegatebw({
          from: model.stakeOwner,
          receiver: model.stakeHolder.toLowerCase(),
          unstake_net_quantity: String(model.net.toFixed(4)) + ' EOS',
          unstake_cpu_quantity: String(model.cpu.toFixed(4)) + ' EOS'
        })
      })
      this.dialogsService.showSuccess(await this.translate.get('delegate.operation-completed').toPromise())
    } catch (error) {
      if (error.type === 'account_missing') {
        this.dialogsService.showFailure('delegate.account-missing')
      } else {
        if (error.code === 402) {
          this.dialogsService.showInfo(error.message)
        } else {
          this.dialogsService.showFailure(error)
        }
      }
    }
    this.buttonUsed = false
  }

  onSubmit () {
    this.buttonUsed = true
    this.model.stakeOwner = this.accountName
    this.accountMissing = false
    this.undelegateBandwidth(this.model)
  }
}
