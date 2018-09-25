import { Component } from '@angular/core'
import { LoginService, AccountService, DialogsService, ButtonBlockService } from '../../services'
import { RegisterProducer } from '../../models/register-producer.model'
import { TranslateService } from '@ngx-translate/core'
import { LocalStorage } from 'ngx-webstorage'

@Component({
  selector: 'app-register-producer',
  templateUrl: './register-producer.component.html',
  styleUrls: [
    './register-producer.component.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})
export class RegisterProducerComponent {
  @LocalStorage()
  buttonUsed: boolean

  model: RegisterProducer
  network: any
  eos: any

  locationsArray: number[] = []
  locations: Set<number>

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private accountService: AccountService
  ) {
    this.buttonUsed = false
    this.model = new RegisterProducer()

    this.accountService.getProducers().subscribe(data => {
      for (let row of data.rows) {
        this.locationsArray.push(row.location)
      }
      this.locations = new Set(this.locationsArray)
    })
  }

  async registerProducer () {
    this.buttonUsed = true
    try {
      let obj = await this.loginService.setupEos()
      this.eos = obj.eos
      this.network = obj.network
/*
      await this.accountService.getProducers().subscribe(data => {
        console.log(this.locations)
        for (let row of data.rows) {
          this.locations.push(row.location)
        }
        console.log(this.locations)
      })
*/
      if (!this.eos) {
        let obj = await this.loginService.setupEos()
        this.eos = obj.eos
        this.network = obj.network
      }

      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
       await this.translate.get('dialogs.scatter-should-appear').toPromise())

      await this.eos.transaction(tr => {
        tr.regproducer({
          producer: this.model.producer.toLowerCase(),
          producer_key: this.model.publicKey,
          url: this.model.url,
          // TODO: insert Location
          location: parseInt(this.model.location, 10)
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
