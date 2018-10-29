import { Component } from '@angular/core'
import { LoginService, CryptoService, DialogsService, ButtonBlockService } from '../../services'
import { LocalStorage } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-set-producer',
  templateUrl: './set-producer.component.html',
  styleUrls: [
    './set-producer.component.scss',
    '../../../button.styles.scss',
    '../../../input.style.scss',
    '../../../page-container.styles.scss'
  ]
})
export class SetProducerComponent {
  scheldule: string
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
  isLoggedIn: string
  @LocalStorage()
  currentPluginName: string

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private cryptoService: CryptoService,
    private dialogsService: DialogsService,
    private translate: TranslateService
  ) {
    this.buttonUsed = false
  }

  async setProducer () {
    this.buttonUsed = true
    if (this.scheldule) {

      try {

        let pubKey = await this.loginService.getPublicKey(this.publicKey)

        let obj = await this.loginService.setupEos()
        this.eos = obj.eos
        this.network = obj.network

        this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
         await this.translate.get(`dialogs.${this.currentPluginName}-should-appear`).toPromise())

        await this.eos.transaction({
          actions: [
            {
              account: 'eosio',
              name: 'setprods',
              authorization: [{ actor: this.accountName, permission: this.permission }],
              data: {
                schedule: [{
                  producer_name: this.scheldule.toLowerCase(),
                  block_signing_key: pubKey
                }]
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
    this.buttonUsed = false
  }
}
