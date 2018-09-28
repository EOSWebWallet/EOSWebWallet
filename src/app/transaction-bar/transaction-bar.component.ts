import { Component, OnInit, HostListener } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { LocalStorage } from 'ngx-webstorage'
import { DialogsService, AccountService, LoginService } from '../services'
import { TransactionBar } from '../models/transaction-bar.model'
import { LoginState } from '../models/login-state.model'

@Component({
  selector: 'app-transaction-bar',
  templateUrl: './transaction-bar.component.html',
  styleUrls: [
    './transaction-bar.component.scss',
    '../../page-container.styles.scss',
    '../../page-container.styles.scss'
  ]
})
export class TransactionBarComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize (event) {
    this.innerWidth = window.innerWidth
  }

  @LocalStorage()
  isLoggedIn: LoginState

  @LocalStorage()
  accountName: string

  innerWidth: any
  resNumber: number
  model: TransactionBar
  result: TransactionBar
  network: any

  constructor (
    public loginService: LoginService,
    private translate: TranslateService,
    private dialogsService: DialogsService,
    private data: AccountService
  ) { }

  ngOnInit () {
    this.innerWidth = window.innerWidth
    if (this.isLoggedIn !== LoginState.out) {
      this.getActions()
    }
  }

  public Refresh () {
    this.getActions()
  }

  getActions () {
    this.result = { actions: [] }
    this.resNumber = 0
    this.data.getActions('{"account_name":"' + this.accountName + '", "offset":-500}').subscribe(data => { // we are exploring only last 500 actions
      if (data) {
        this.model = data
        this.model.actions.reverse()
        for (let action in this.model.actions) {
          console.log((this.model.actions[action]).action_trace.act.name)
          if ((this.model.actions[action]).action_trace.act.name === 'transfer' && this.resNumber < 5) {
            if ((this.model.actions[action]).action_trace.act.data.from === this.accountName) {
              this.model.actions[action].direction = 'Out'
            } else {
              this.model.actions[action].direction = 'In'
            }
            this.result.actions.push(this.model.actions[action])
            this.resNumber++
          }
        }
      }
    })
  }
}
