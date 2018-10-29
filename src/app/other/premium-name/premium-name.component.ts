import { Component } from '@angular/core'
import { PremiumName } from '../../models/premium-name.model'
import { LocalStorage } from 'ngx-webstorage'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { TranslateService } from '@ngx-translate/core'
import { InformationService } from '../../services/information.service'

@Component({
  selector: 'app-premium-name',
  templateUrl: './premium-name.component.html',
  styleUrls: [
    './premium-name.component.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})
export class PremiumNameComponent {
  network: any
  eos: any

  @LocalStorage()
  buttonUsed: boolean
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  currentPluginName: string

  model: PremiumName

  constructor (
    private infoService: InformationService,
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private translate: TranslateService
  ) {
    this.buttonUsed = false
    this.model = (this.loginService.loggedIn())
      ? new PremiumName('', this.accountName, 0.001)
      : new PremiumName('', this.accountName, null)
  }

  async onSubmitPrices () {
    this.buttonUsed = true

    let obj = await this.loginService.setupEos()
    this.eos = obj.eos
    this.network = obj.network

    this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
     await this.translate.get(`dialogs.${this.currentPluginName}-should-appear`).toPromise())

    try {
      await this.eos.transaction({
        actions: [{
          account: 'eosio',
          name: 'bidname',
          authorization: [{ actor: this.accountName, permission: this.permission }],
          data: {
            bidder: this.model.bidder,
            newname: this.model.premiumName.toLowerCase(),
            bid: this.model.bid.toFixed(4) + ' EOS'
          }
        }]
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
