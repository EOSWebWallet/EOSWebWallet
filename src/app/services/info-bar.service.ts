import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { AccountService } from '../services/account.service'
import { AccountInfo } from '../models/account-info.model'
import { Currency } from '../models/tokens.model'
import { interval, Subscription } from 'rxjs'
import { LocalStorage } from 'ngx-webstorage'
import { LoginState } from '../models/login-state.model'
import { NetworkChaindId } from '../models/network.model';

@Injectable()
export class InfoBarService implements OnInit, OnDestroy {

  @LocalStorage()
  isLoggedIn: LoginState

  @LocalStorage()
  accountName: string

  @LocalStorage()
  currentNetwork: string

  @LocalStorage()
  currentchainid: string

  tokenString: string
  tokenStringTemp: string
  tokenInfo: string
  accountInfo: AccountInfo
  errorMessage: string = ''
  tokenArray: {token: string, balance: string}[] = []
  netPercent: number
  cpuPercent: number
  ramPercent: number
  netData: string
  cpuData: string
  stacked: number
  unstacked: number
  exUsdTotal: number

  userSymbol: string[] = []
  lastChainid: string

  constructor (private data: AccountService) {}

  subscribe = interval(1000).subscribe(val => {
    if (this.isLoggedIn !== LoginState.out) {
      this.getInfo(this.accountName)
    }
  })

  ngOnInit () {
    if (this.isLoggedIn !== LoginState.out) {
      this.getInfo(this.accountName)
    }
  }

  getInfo (AccountName: string) {
    if (!this.lastChainid) {
      this.lastChainid = this.currentchainid
    } else {
      if (this.lastChainid !== this.currentchainid) {
        this.lastChainid = this.currentchainid
        this.clearUserSymbol()
      }
    }
    if (this.accountInfo) {
      this.exUsdTotal = this.accountInfo.usd_total
    }
    let tokenList = new Currency()
    this.data.findByName('{"account_name":"' + AccountName + '"}').subscribe(
      result => {
        if (result) {
          this.accountInfo = result
          this.netPercent = Math.round(Number(this.accountInfo.net_limit.used) / Number(this.accountInfo.net_limit.max) * 100)
          this.cpuPercent = Math.round(Number(this.accountInfo.cpu_limit.used) / Number(this.accountInfo.cpu_limit.max) * 100)
          if (this.accountInfo.total_resources.net_weight) {
            this.netData = this.accountInfo.total_resources.net_weight.split(' ', 1).toString()
          }
          if (this.accountInfo.total_resources.cpu_weight) {
            this.cpuData = this.accountInfo.total_resources.cpu_weight.split(' ', 1).toString()
          }
          if (!Number.isNaN(Number.parseFloat(this.netData))) {
            this.netData = parseFloat(this.netData).toFixed(2).toString()
          }
          if (!Number.isNaN(Number.parseFloat(this.cpuData))) {
            this.cpuData = parseFloat(this.cpuData).toFixed(2).toString()
          }
          this.ramPercent = Math.round(Number(this.accountInfo.ram_usage) / Number(this.accountInfo.ram_quota) * 100)

          this.accountInfo.voter_info.staked = this.accountInfo.voter_info.staked.toString()
          this.accountInfo.cpu_used_sec = Number(this.accountInfo.cpu_limit.used) / 1000000
          this.accountInfo.cpu_max_sec = (Number(this.accountInfo.cpu_limit.max) / 1000000)
          this.accountInfo.net_used_kb = Number(this.accountInfo.net_limit.used) / 1000
          this.accountInfo.net_max_kb = Number(this.accountInfo.net_limit.max) / 1000
          this.accountInfo.ram_used_kb = Number(this.accountInfo.ram_usage) / 1000
          this.accountInfo.ram_max_kb = Number(this.accountInfo.ram_quota) / 1000
          if (this.accountInfo.core_liquid_balance !== undefined) {
            if (this.accountInfo.core_liquid_balance) {
              this.unstacked = Number(this.accountInfo.core_liquid_balance.split(' ', 1)[0]) - this.stacked
            } else {
              this.accountInfo.core_liquid_balance = '0'
              this.unstacked = 0
            }

            if (this.currentchainid === NetworkChaindId.MainNet) {
              this.data.getTokensMainNet(AccountName).subscribe((result) => {
                if (result && result.length) {
                  this.tokenStringTemp = ''
                  result.forEach(rez => {
                    this.tokenStringTemp += rez.amount + ' ' + rez.symbol + ', '
                    this.addUserSymbol(rez.symbol)
                  })
                  this.tokenStringTemp = this.tokenStringTemp.substring(0, this.tokenStringTemp.length - 2)
                }
              })
            } else {
              this.data.getAllTokensInfo(tokenList.tokens, AccountName).subscribe((result) => {
                if (result && result.length) {
                  result.forEach(resultArr => {
                    resultArr.forEach(element => {
                      this.addUserSymbol(element.substring(element.lastIndexOf(' ') + 1))
                    })
                  })
                }
                this.tokenStringTemp = result.toString()
              })
            }

            this.stacked = +this.accountInfo.voter_info.staked / 10000
            this.accountInfo.total_balance = Number(this.accountInfo.core_liquid_balance.split(' ', 1)[0]) + this.stacked + ''
            this.data.getCurrentCourse().subscribe((result) => {
              this.accountInfo.usd_total = Number(this.accountInfo.total_balance) * Number(result.market_data.current_price.usd)
            })
          } else {
            this.accountInfo.core_liquid_balance = '0'
            this.unstacked = 0
            this.accountInfo.total_balance = Number(this.accountInfo.voter_info.staked).toString()
          }
        }
      },
      error => {
        this.errorMessage = error.message
      })

    if (this.tokenStringTemp) {
      this.tokenString = this.tokenStringTemp
    }
  }

  addUserSymbol (symbol: string) {
    let findSymbol = false
    this.userSymbol.forEach(element => {
      if (element.toLocaleLowerCase() === symbol.toLocaleLowerCase()) {
        findSymbol = true
        return
      }
    })
    if (!findSymbol) {
      this.userSymbol.push(symbol)
    }
  }

  clearUserSymbol () {
    this.userSymbol = []
  }

  ngOnDestroy () {
    if (this.subscribe) {
      this.subscribe.unsubscribe()
    }
  }

}
