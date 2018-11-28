import { Component, ViewChild } from '@angular/core'
import { PapaParseService } from 'ngx-papaparse'
import { Transfer } from '../models/transfer.model'
import { LocalStorage } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'
import { LoginState } from '../models/login-state.model'
import { ActivatedRoute } from '@angular/router'
import { LoginService, DialogsService, CryptoService, ButtonBlockService, InfoBarService, FactoryPluginService } from '../services'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import * as _ from 'lodash'
import { TransactionBarComponent } from '../transaction-bar/transaction-bar.component'

@Component({
  selector: 'app-transfer-tokens',
  templateUrl: './transfer-tokens.component.html',
  styleUrls: [
    './transfer-tokens.component.scss',
    '../../icon.styles.scss',
    '../../input.style.scss',
    '../../button.styles.scss',
    '../../page-container.styles.scss'
  ]
})
export class TransferTokensComponent {
  faQuestionCircle = faQuestionCircle
  network: any
  eos: any

  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  currentChainId: string
  @LocalStorage()
  isLoggedIn: LoginState
  @LocalStorage()
  publicKey: string
  @LocalStorage()
  buttonUsed: boolean
  @LocalStorage()
  currentPluginName: string

  symbols: string[][]

  model: Transfer[]
  lastColorIsWhite = true

  @ViewChild(TransactionBarComponent) bar: TransactionBarComponent

  constructor (
    public loginService: LoginService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private dialogsService: DialogsService,
    private cryptoService: CryptoService,
    public buttonBlockService: ButtonBlockService,
    public factoryPluginService: FactoryPluginService,
    private papa: PapaParseService,
    private info: InfoBarService
  ) {
    this.model = []
    this.model.push(new Transfer('', '', '', null, ''))
    this.buttonUsed = false
    this.symbols = info.userSymbol
  }

  async transferTokens (model) {
    this.buttonUsed = true

    this.loginService.setupEos().then(async obj => {
      this.eos = obj.eos
      this.network = obj.network
      const options = { authorization: [`${this.accountName}@${this.permission}`] }

      let message = await this.translate.get(`dialogs.${this.currentPluginName}-should-appear`).toPromise()
      let title = await this.translate.get('dialogs.transaction-wil-be-sent').toPromise()
      this.dialogsService.showSending(message, title)
      try {
        await this.eos.transaction(tr => {
          for (let item of model) {
            let account = this.symbols.filter(p => p[0] == item.symbol)
            console.log(account[0][0])
            tr.transfer(this.accountName, item.recipient.toLowerCase(), item.quantity.toFixed(4) + ' ' + item.symbol, item.memo, options)
          }
        })
        this.dialogsService.showSuccess(await this.translate.get('transfer-tokens.transfer-completed').toPromise())
        this.buttonUsed = false
        this.bar.Refresh()
      } catch (err) {
        if (err.code === 402) {
          this.dialogsService.showInfo(err.message)
        } else {
          this.dialogsService.showFailure(err)
        }
        this.buttonUsed = false
      }
    })
  }

  addRow () {
    this.model.push(new Transfer('', '', '', null, ''))
    this.lastColorIsWhite = !this.lastColorIsWhite
  }

  removeRow (index) {
    if (this.model.length > 1 && index > 0) {
      this.model.splice(index, 1)
      this.lastColorIsWhite = !this.lastColorIsWhite
    }
  }

  async onSubmit () {
    await this.transferTokens(this.model)
  }

  attachFile (event, file) {
    // Recipient;Memo;0.01;Symbol
    let self = this
    this.papa.parse(file.files[0], {
      download: true,
      complete: (results) => {
        this.model = []
        results.data.forEach(element => {
          let arr = element
          self.model.push(new Transfer(element[0], '', element[1], +element[2], element[3]))
        })
      }
    })
  }

  doFilterSymbols (value: string) {
    return this.symbols.filter(symbol => symbol[0].toUpperCase().indexOf(value.toUpperCase()) !== -1)
  }

}
