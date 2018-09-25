import { Component } from '@angular/core'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { LocalStorage } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-remove-producer',
  templateUrl: './remove-producer.component.html',
  styleUrls: [
    './remove-producer.component.scss',
    '../../../button.styles.scss',
    '../../../input.style.scss',
    '../../../page-container.styles.scss'
  ]
})
export class RemoveProducerComponent {
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  buttonUsed: boolean

  name: string
  network: any
  eos: any

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private translate: TranslateService
  ) {
    this.buttonUsed = false
  }

  async removeProducer () {
    this.buttonUsed = true
    try {
      let obj = await this.loginService.setupEos()
      this.eos = obj.eos
      this.network = obj.network
      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
       await this.translate.get('dialogs.scatter-should-appear').toPromise())

      await this.eos.transaction({
        actions: [{
          account: 'eosio',
          name: 'rmvproducer',
          authorization: [{ actor: this.accountName, permission: this.permission }],
          data: {
            producer: this.name.toLowerCase()
          }
        }]
      })
      /*
      await this.eos.transaction(tr => {
        tr.rmvproducer({
          producer: this.name.toLowerCase()
        })
      })
      */
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
