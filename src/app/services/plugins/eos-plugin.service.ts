import { Injectable } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'
import { BasePluginService } from './base-plugin'

declare var Eos: any

import * as Eos from 'eosjs'

@Injectable()
export class EosPluginService extends BasePluginService {
  ready: Promise<void>
  eosPlugin: any
  eos: any
  network: any
  identity: any

  @LocalStorage()
  currentNetwork: string
  @LocalStorage()
  currentChainId: string
  @LocalStorage()
  port: number
  @LocalStorage()
  protocol: string
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string

  constructor (private translations: TranslateService) {
    super()
    this.name = 'eos'
    // let resolved = false
    // this.ready = new Promise<void>((resolve, reject) => {
    //   document.addEventListener('eosPluginLoaded', () => {
    //     this.load()
    //     resolve()
    //     resolved = true
    //   })
    //   setTimeout(() => {
    //     if (!resolved) {
    //       reject()
    //     }
    //   }, 2000)
    // })
  }

  async login (successCallback, errorCallbak) {

    console.log('aaa')

    // this.network = {
    //   blockchain: 'eos',
    //   protocol: 'https',
    //   port: this.port,
    //   host: this.currentNetwork,
    //   chainId: this.currentChainId
    // }

    // const requiredFields = {
    //   accounts: [
    //     this.network
    //   ]
    // }

    // const self = this

    // if (this.eosPlugin) {
    //   this.eosPlugin.requestIdentity(this.network).then(identity => {
    //     if (!identity) {
    //       return errorCallbak()
    //     }
    //     this.accountName = identity.accounts[0].name
    //     this.permission = identity.accounts[0].authority
    //     self.identity = identity
    //   //  self.scatter.useIdentity(identity.hash)
    //     successCallback()
    //   }).catch(error => {
    //     errorCallbak(error)
    //   })
    // } else {
    //   alert(await this.translations.get('errors.eos-plugin-not').toPromise())
    // }

  }

  logout () {
    // this.scatter.forgetIdentity().then(() => { this.identity = null })
  }

  load () {
    // this.eosPlugin = (window as any).eosPlugin

    // this.network = {
    //   blockchain: 'eos',
    //   port: this.port,
    //   host: this.currentNetwork,
    //   chainId: this.currentChainId
    // }

    // let protocol = this.protocol.substr(0, this.protocol.indexOf('://'))
    // this.eos = this.eosPlugin.eos(this.network, Eos, {}, protocol)
  }
}
