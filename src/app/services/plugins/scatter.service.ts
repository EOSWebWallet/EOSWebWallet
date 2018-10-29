import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { BasePluginService } from './base-plugin'

declare var Eos: any

import * as Eos from 'eosjs'

@Injectable()
export class ScatterService extends BasePluginService {

  constructor (private translations: TranslateService) {
    super()
    this.name = 'scatter'
    this.downloadLink = 'https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle/support?hl=en'
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

  async login () {
    this.setNetwork.call(this)
    const requiredFields = {
      accounts: [
        this.network
      ]
    }

    if (this.plugin) {
      await this.requestIdentity(this.plugin.getIdentity, requiredFields)
    } else {
      alert(await this.translations.get(`errors.${this.name}-not`).toPromise())
    }
  }

  logout () {
    // this.scatter.forgetIdentity().then(() => { this.identity = null })
  }

  load () {
    this.plugin = (window as any).scatter
    this.plugin.getIdentity = this.plugin.getIdentity.bind(this.plugin)

    this.loadPlugin()
  }
}
