import { Component } from '@angular/core'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { LocalStorage } from 'ngx-webstorage'
import { CancelDelay } from '../../models/cancel-delay.model'
import { TranslateService } from '@ngx-translate/core'
import * as shajs from 'sha.js'

@Component({
  selector: 'app-cancel-delay',
  templateUrl: './cancel-delay.component.html',
  styleUrls: [
    './cancel-delay.component.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})

export class CancelDelayComponent {
  model: CancelDelay
  network: any
  eos: any

  error: any

  @LocalStorage()
  permission: string
  @LocalStorage()
  accountName: string
  @LocalStorage()
  buttonUsed: boolean
  @LocalStorage()
  currentPluginName: string

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private translate: TranslateService,
    private dialogsService: DialogsService
  ) {
    this.buttonUsed = false
    this.model = new CancelDelay('','','')
  }

  async onSubmit () {
    this.buttonUsed = true

    let obj = await this.loginService.setupEos()
    this.eos = obj.eos
    this.network = obj.network

    try {
      let hashedString = shajs('sha256').update(this.model.trxId).digest('hex')

      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
       await this.translate.get(`dialogs.${this.currentPluginName}-should-appear`).toPromise())

      await this.eos.transaction({
        actions: [
          {
            account: 'eosio',
            name: 'canceldelay',
            authorization: [{ actor: this.accountName, permission: this.permission }],
            data: {
              canceling_auth: {
                actor: this.model.accountName.toLowerCase(),
                permission: this.model.permission
              },
              trx_id: hashedString
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
