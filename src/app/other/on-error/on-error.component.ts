import { Component } from '@angular/core'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { OnError } from '../../models/on-error.model'
import { TranslateService } from '@ngx-translate/core'
import { LocalStorage } from 'ngx-webstorage'

@Component({
  selector: 'app-on-error',
  templateUrl: './on-error.component.html',
  styleUrls: [
    './on-error.component.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})
export class OnErrorComponent {
  @LocalStorage()
  buttonUsed: boolean
  model: OnError
  network: any
  eos: any

  error: any

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private translate: TranslateService,
    private dialogsService: DialogsService
  ) {
    this.buttonUsed = false
    this.model = (this.loginService.loggedIn())
      ? new OnError(0, 0)
      : new OnError(null, null)
  }

  async onError () {
    this.buttonUsed = true

    let obj = await this.loginService.setupEos()
    this.eos = obj.eos
    this.network = obj.network

    this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
     await this.translate.get('dialogs.scatter-should-appear').toPromise())

    try {
      await this.eos.transaction({
        actions: [
          {
            account: 'eosio',
            name: 'onerror',
            authorization: [],
            data: {
              sender_id: this.model.senderId,
              sent_trx: this.model.sentTrx
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
