import { Component, ViewChild, ElementRef } from '@angular/core'
import { Unit, BuyRam } from '../../../models/buy-ram.model'
import { LocalStorage } from 'ngx-webstorage'
import { LoginService, DialogsService, ButtonBlockService } from '../../../services'
import { LoginState } from '../../../models/login-state.model'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-buy-ram',
  templateUrl: './buy-ram.component.html',
  styleUrls: [
    './buy-ram.component.scss',
    '../buy-sell-ram.component.scss',
    '../../../../button.styles.scss',
    '../../../../input.style.scss',
    '../../../../page-container.styles.scss'
  ]
})
export class BuyRamComponent {

  @LocalStorage()
  accountName: string

  @LocalStorage()
  isLoggedIn: LoginState

  @LocalStorage()
  buttonUsed: boolean

  @ViewChild('ram') ram: ElementRef

  modelBuy: BuyRam
  submittedBuy: boolean
  Unit = Unit
  network: any
  eos: any
  modelUnitRam: string[]

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private translate: TranslateService
  ) {
    this.modelBuy = new BuyRam()
    this.modelUnitRam = Object.keys(Unit).filter(k => typeof Unit[k as any] !== 'number')
    this.modelBuy.unit = this.modelUnitRam[1]
    this.submittedBuy = false
    this.buttonUsed = false
  }

  async buyRam (model) {
    try {
      if (!this.eos) {
        let obj = await this.loginService.setupEos()
        this.eos = obj.eos
        this.network = obj.network
      }
    } catch (err) {
      this.dialogsService.showFailure(err)
      return
    }

    // do not fix with ===
    if (model.unit == Unit.bytes) {
      try {
        this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(), await this.translate.get('dialogs.scatter-should-appear').toPromise())
        await this.eos.transaction(tr => {
          tr.buyrambytes({
            payer: model.payer,
            receiver: model.recipient.toLowerCase(),
            bytes: model.ram
          })
        })
        this.dialogsService.showSuccess(await this.translate.get('buy-sell-ram.operation-completed').toPromise())
      } catch (err) {
        if (err.code === 402) {
          this.dialogsService.showInfo(err.message)
        } else {
          this.dialogsService.showFailure(err)
        }
      }
    } else if (model.unit == Unit.eos) {
      try {
        this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(), await this.translate.get('dialogs.scatter-should-appear').toPromise())
        await this.eos.transaction(tr => {
          tr.buyram({
            payer: model.payer,
            receiver: model.recipient,
            quant: String(model.ram.toFixed(4)) + ' EOS'
          })
        })
        this.dialogsService.showSuccess(await this.translate.get('buy-sell-ram.operation-completed').toPromise())
      } catch (err) {
        if (err.code === 402) {
          this.dialogsService.showInfo(err.message)
        } else {
          this.dialogsService.showFailure(err)
        }
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

  onSubmitBuy () {
    this.buttonUsed = true
    this.modelBuy.payer = this.accountName
    this.submittedBuy = true
    this.buyRam(this.modelBuy)
  }
}
