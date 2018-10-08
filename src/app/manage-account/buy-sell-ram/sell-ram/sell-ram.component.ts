import { Component, ViewChild, ElementRef } from '@angular/core'
import { Unit } from '../../../models/buy-ram.model'
import { SellRam } from '../../../models/sell-ram.model'
import { LocalStorage } from 'ngx-webstorage'
import { LoginService, DialogsService, ButtonBlockService } from '../../../services'
import { LoginState } from '../../../models/login-state.model'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-sell-ram',
  templateUrl: './sell-ram.component.html',
  styleUrls: [
    './sell-ram.component.scss',
    '../buy-sell-ram.component.scss',
    '../../../../button.styles.scss',
    '../../../../input.style.scss',
    '../../../../page-container.styles.scss'
  ]
})
export class SellRamComponent {

  @LocalStorage()
  accountName: string

  @LocalStorage()
  permission: string

  @LocalStorage()
  isLoggedIn: LoginState

  @LocalStorage()
  buttonUsed: boolean

  @ViewChild('ram') ram: ElementRef

  modelSell: SellRam
  submittedSell: boolean
  Unit = Unit
  network: any
  eos: any

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private translate: TranslateService
  ) {
    this.modelSell = new SellRam()
    this.submittedSell = false
    this.buttonUsed = false
  }

  async sellRam (model) {
    try {
      if (!this.eos) {
        let obj = await this.loginService.setupEos()
        this.eos = obj.eos
        this.network = obj.network
      }
      const options = { authorization: [`${this.accountName}@${this.permission}`] }

      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(), await this.translate.get('dialogs.scatter-should-appear').toPromise())
      await this.eos.transaction(tr => {
        tr.sellram({
          account: model.seller,
          bytes: model.ram
        }, options)
      })
      this.dialogsService.showSuccess(await this.translate.get('buy-sell-ram.operation-completed').toPromise())
    } catch (err) {
      if (err.code === 402) {
        this.dialogsService.showInfo(err.message)
      } else {
        this.dialogsService.showFailure(err)
      }
    }
    this.buttonUsed = false
  }

  onChangeEos () {
    this.ram.nativeElement.step = 1
  }

  onChangeBytes () {
    this.ram.nativeElement.step = 1024
  }

  onSubmitSell () {
    this.buttonUsed = true
    this.modelSell.seller = this.accountName
    this.submittedSell = true
    this.sellRam(this.modelSell)
  }
}
