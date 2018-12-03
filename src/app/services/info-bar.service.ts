import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { interval, Subscription } from 'rxjs'

import { AccountService } from '../services/account.service'
import { AccountInfo } from '../models/account-info.model'
import { Currency } from '../models/tokens.model'
import { LocalStorage } from 'ngx-webstorage'
import { LoginState } from '../models/login-state.model'
import { NetworkChaindId } from '../models/network.model'

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

  userSymbol: string[][] = []
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
          this.ramPercent = (Math.round(Number(this.accountInfo.ram_quota) - Number(this.accountInfo.ram_usage)) / Number(this.accountInfo.ram_quota) * 100)
          this.accountInfo.voter_info.staked = this.accountInfo.voter_info.staked.toString()
          this.accountInfo.cpu_used_sec = Number(this.accountInfo.cpu_limit.used)
          this.accountInfo.cpu_available_sec = Number(this.accountInfo.cpu_limit.available)
          this.accountInfo.cpu_max_sec = (Number(this.accountInfo.cpu_limit.max))
          this.accountInfo.net_used_layout = (Number(this.accountInfo.net_limit.used) / 1024).toFixed(3).toString()
          this.accountInfo.net_available_layout = (Number(this.accountInfo.net_limit.available) / 1024).toFixed(3).toString()
          this.accountInfo.net_max_layout = (Number(this.accountInfo.net_limit.max) / 1024).toFixed(3).toString()
          if (Number(this.accountInfo.net_available_layout) > 1024) {
            this.accountInfo.net_used_layout = (Number(this.accountInfo.net_used_layout) / 1024).toFixed(3).toString() + ' MB'
            this.accountInfo.net_max_layout = (Number(this.accountInfo.net_max_layout) / 1024).toFixed(3).toString() + ' MB'
            this.accountInfo.net_available_layout = (Number(this.accountInfo.net_available_layout) / 1024).toFixed(3).toString()
          } else {
            this.accountInfo.net_used_layout += ' KB'
            this.accountInfo.net_max_layout += ' KB'
          }
          this.accountInfo.ram_used_layout = (Number(this.accountInfo.ram_usage) / 1024).toFixed(3).toString()
          this.accountInfo.ram_available_layout = ((Number(this.accountInfo.ram_quota) - Number(this.accountInfo.ram_usage)) / 1024).toFixed(3).toString()
          this.accountInfo.ram_max_layout = (Number(this.accountInfo.ram_quota) / 1024).toFixed(3).toString()
          if (Number(this.accountInfo.ram_available_layout) > 1024) {
            this.accountInfo.ram_used_layout = (Number(this.accountInfo.ram_used_layout) / 1024).toFixed(3).toString() + ' MB'
            this.accountInfo.ram_max_layout = (Number(this.accountInfo.ram_max_layout) / 1024).toFixed(3).toString() + ' MB'
            this.accountInfo.ram_available_layout = (Number(this.accountInfo.ram_available_layout) / 1024).toFixed(3).toString()
          } else {
            this.accountInfo.ram_used_layout += ' KB'
            this.accountInfo.ram_max_layout += ' KB'
          }
          if (this.accountInfo.core_liquid_balance !== undefined) {
            if (this.accountInfo.core_liquid_balance) {
              this.unstacked = Number(this.accountInfo.core_liquid_balance.split(' ', 1)[0]) - this.stacked
            } else {
              this.accountInfo.core_liquid_balance = '0'
              this.unstacked = 0
            }
            if (this.currentchainid === NetworkChaindId.MainNet) {
              this.data.getTokensGreymass(AccountName).subscribe((tokens) => {
                if (tokens && tokens.length) {
                  this.tokenStringTemp = this.setTokensGreymassSymbol(tokens)
                } else {
                  this.data.getTokensEosflare(AccountName).subscribe((result) => {
                    if (result && result.account) {
                      this.tokenStringTemp = this.setTokensEosflareSymbol(result.account.tokens)
                    } else {
                      this.data.getAllTokensInfo(tokenList.tokens, AccountName).subscribe((tokensResult) => {
                        this.tokenStringTemp = this.setTokensSymbol(tokensResult)
                      })
                    }
                  })
                }
              })
            } else {
              this.data.getAllTokensInfo(tokenList.tokens, AccountName).subscribe((tokens) => {
                this.tokenStringTemp = this.setTokensSymbol(tokens)
              })
            }
            this.stacked = +this.accountInfo.voter_info.staked / 10000
            this.accountInfo.cpu_stacked = this.accountInfo.total_resources.cpu_weight
            this.accountInfo.net_stacked = this.accountInfo.total_resources.net_weight
            this.accountInfo.net_self_stacked = this.accountInfo.self_delegated_bandwidth.net_weight
            this.accountInfo.cpu_self_stacked = this.accountInfo.self_delegated_bandwidth.cpu_weight

            if (!isNaN(parseFloat(this.accountInfo.refund_request.cpu_amount))) {
            this.accountInfo.refund = parseFloat(this.accountInfo.refund_request.cpu_amount)
            }
            if (!isNaN(parseFloat(this.accountInfo.refund_request.net_amount))) {
              this.accountInfo.refund = this.accountInfo.refund + parseFloat(this.accountInfo.refund_request.net_amount)
            }

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

  private setTokensGreymassSymbol (tokens): string {
    let tokenStringTemp = ''
    tokens.forEach(rez => {
      tokenStringTemp += rez.amount + ' ' + rez.symbol + ', '
      let precision = rez.amount.split(".")[1] ? rez.amount.split(".")[1].length : 0
      this.addUserSymbol(rez.symbol, rez.code, precision)
    })
    return tokenStringTemp.substring(0, tokenStringTemp.length - 2)
  }

  private setTokensEosflareSymbol (tokens): string {
    let tokenStringTemp = ''
    tokens.forEach(rez => {
      tokenStringTemp += rez.balance + ' ' + rez.symbol + ', '
      let precision = rez.balance.split(".")[1] ? rez.balance.split(".")[1].length : 0
      this.addUserSymbol(rez.symbol, rez.code, precision)
    })
    return tokenStringTemp.substring(0, tokenStringTemp.length - 2)
  }

  private setTokensSymbol (tokens): string {
    if (tokens && tokens.length) {
      let tokenStringTemp = ''
      tokens.forEach(resultArr => {
        resultArr.forEach(element => {
          let name = element.substring(element.lastIndexOf(' ') + 1)
          let code = new Currency().tokens.filter(function(c) {
            return c[1] == name;
          });
          let precision
          if (element.indexOf('.') > -1){
            precision = element.split('.', 2)[1].split(' ',1)[0].length
          } else {
            precision = 0
          }
          this.addUserSymbol(name, code[0][0], precision)
          tokenStringTemp += element + ', '
        })
      })
      return tokenStringTemp.substring(0, tokenStringTemp.length - 2)
    }
    return ''
  }

  private addUserSymbol (symbol: string, code: string, precision: string) {
    let findSymbol = false
    this.userSymbol.forEach(element => {
      if (element[0].toLocaleLowerCase() === symbol.toLocaleLowerCase()) {
        findSymbol = true
        return
      }
    })
    if (!findSymbol) {
      this.userSymbol.push([symbol, code, precision])
    }
  }

  private clearUserSymbol () {
    this.userSymbol = []
  }

  ngOnDestroy () {
    if (this.subscribe) {
      this.subscribe.unsubscribe()
    }
  }

}
