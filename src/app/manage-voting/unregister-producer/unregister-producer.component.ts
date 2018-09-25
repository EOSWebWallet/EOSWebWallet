import { Component } from '@angular/core'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { TranslateService } from '@ngx-translate/core'
import { LocalStorage } from 'ngx-webstorage'

@Component({
  selector: 'app-unregister-producer',
  templateUrl: './unregister-producer.component.html',
  styleUrls: [
    './unregister-producer.component.scss',
    '../../../button.styles.scss',
    '../../../input.style.scss',
    '../../../page-container.styles.scss'
  ]
})
export class UnregisterProducerComponent {
  @LocalStorage()
  buttonUsed: boolean
  producer: string
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

  async unregisterProducer () {
    this.buttonUsed = true
    try {
      let obj = await this.loginService.setupEos()
      this.eos = obj.eos
      this.network = obj.network

      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
       await this.translate.get('dialogs.scatter-should-appear').toPromise())

      await this.eos.transaction(tr => {
        tr.unregprod({
          producer: this.producer.toLowerCase()
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
    this.buttonUsed = false
  }
}
