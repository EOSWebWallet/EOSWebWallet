import { Injectable } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'
import { BasePluginService } from './base-plugin'

declare var Eos: any

import * as Eos from 'eosjs'

@Injectable()
export class ScatterService extends BasePluginService {

  constructor (private translations: TranslateService) {
    super()
    this.name = 'scatter'
    let resolved = false
    this.ready = new Promise<void>((resolve, reject) => {
      document.addEventListener('scatterLoaded', () => {
        this.load()
        resolve()
        resolved = true
      })
      setTimeout(() => {
        if (!resolved) {
          reject()
        }
      }, 2000)
    })
  }

  async login (successCallback, errorCallbak) {

    this.network = {
      blockchain: 'eos',
      protocol: 'https',
      port: this.port,
      host: this.currentNetwork,
      chainId: this.currentChainId
    }

    const requiredFields = {
      accounts: [
        this.network
      ]
    }

    const self = this
    console.log(this.plugin)

    if (this.plugin) {
      console.log(this.plugin)

      this.plugin.getIdentity(requiredFields).then(identity => {
      console.log(identity)

        if (!identity) {
      console.log(this.plugin)

          return errorCallbak()
        }
        this.accountName = identity.accounts[0].name
        this.permission = identity.accounts[0].authority
        self.identity = identity
      //  self.scatter.useIdentity(identity.hash)
        successCallback()
      }).catch(error => {
      console.log(error)

        errorCallbak(error)
      })
    } else {
      alert(await this.translations.get('errors.scatter-not').toPromise())
    }

  }

  logout () {
    // this.scatter.forgetIdentity().then(() => { this.identity = null })
  }

  load () {
    this.plugin = (window as any).scatter

    this.network = {
      blockchain: 'eos',
      port: this.port,
      host: this.currentNetwork,
      chainId: this.currentChainId
    }

    let protocol = this.protocol.substr(0, this.protocol.indexOf('://'))
    this.eos = this.plugin.eos(this.network, Eos, {}, protocol)
  }
}
