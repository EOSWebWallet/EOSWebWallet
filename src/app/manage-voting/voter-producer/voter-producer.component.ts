import { Component } from '@angular/core'
import { VoteProducer } from '../../models/vote-producer.model'
import { LocalStorage } from 'ngx-webstorage'
import { LoginService, DialogsService, CryptoService, ButtonBlockService } from '../../services'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-voter-producer',
  templateUrl: './voter-producer.component.html',
  styleUrls: [
    './voter-producer.component.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})
export class VoterProducerComponent {
  model: VoteProducer
  network: any
  eos: any

  @LocalStorage()
  buttonUsed: boolean
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  publicKey: string
  @LocalStorage()
  currentChainId: string
  @LocalStorage()
  isLoggedIn: string

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private cryptoService: CryptoService,
    private translate: TranslateService
  ) {
    this.buttonUsed = false
    this.model = new VoteProducer('', '', [])
    this.model.voter = this.accountName
  }

  async voteProducer () {
    this.buttonUsed = true
    let options = await this.loginService.getFullOptions()

    try {
      let obj = await this.loginService.setupEos()
      this.eos = obj.eos
      this.network = obj.network

      for (let i = 0; i < this.model.producers.length; i++) {
        this.model.producers[i] = this.model.producers[i].toLowerCase()
      }

      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
       await this.translate.get('dialogs.scatter-should-appear').toPromise())

      await this.eos.transaction(tr => {
        tr.voteproducer({
          voter: this.model.voter,
          proxy: this.model.proxy.toLowerCase(),
          producers: this.model.producers
        })
      }, options)
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

  addProducer (name: string) {
    if (name) {
      this.model.producers.push(name)
    }
  }

  deleteProducer (name: string) {
    this.model.producers = this.model.producers.filter(producer => {
      return producer !== name
    })
  }
}
