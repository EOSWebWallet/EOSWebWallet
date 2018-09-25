import { Component } from '@angular/core'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { LocalStorage } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-set-proxy',
  templateUrl: './set-proxy.component.html',
  styleUrls: [
    './set-proxy.component.scss',
    '../../../page-container.styles.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss'
  ]
})
export class SetProxyComponent {
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  buttonUsed: boolean

  proxy: string
  voter: string
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

  async setProxy () {
    this.buttonUsed = true
    let options = {
      broadcast: true,
      sign: true,
      verbose: true,
      authorization: [{ actor: this.accountName, permission: this.permission }]
    }
    try {

      let obj = await this.loginService.setupEos()
      this.eos = obj.eos
      this.network = obj.network

      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
       await this.translate.get('dialogs.scatter-should-appear').toPromise())

      await this.eos.transaction({
        actions: [{
          account: 'eosio',
          name: 'voteproducer',
          authorization: [{ actor: this.accountName, permission: this.permission }],
          data: {
            proxy: this.proxy.toLowerCase(),
            voter: this.voter.toLowerCase(),
            producers: []
          }
        }]
      })
      /*
      await this.eos.transaction(tr => {
        tr.voteproducer({
          proxy: this.proxy,
          voter: this.voter,
          producers: []
        })
      }, options) */
      this.dialogsService.showSuccess(await this.translate.get('common.operation-completed').toPromise())
      this.buttonUsed = false
    } catch (error) {
      if (error.code === 402) {
        this.dialogsService.showInfo(error.message)
      } else {
        this.dialogsService.showFailure(error)
      }
      this.buttonUsed = false
    }
    this.buttonUsed = false
  }
}
