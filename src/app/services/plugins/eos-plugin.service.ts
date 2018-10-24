import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { BasePluginService } from './base-plugin'

declare var Eos: any

import * as Eos from 'eosjs'

@Injectable()
export class EosPluginService extends BasePluginService {

  constructor (private translations: TranslateService) {
    super()
    this.name = 'eos-plugin'
    this.downloadLink = 'https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle/support?hl=en'
    let resolved = false
    this.ready = new Promise<void>((resolve, reject) => {
      document.addEventListener('eosPluginLoaded', () => {
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

    if (this.plugin) {
      await this.requestIdentity(this.plugin.requestIdentity, this.network)
    } else {
      alert(await this.translations.get(`errors.${this.name}-not`).toPromise())
    }
  }

  logout () {
    // this.scatter.forgetIdentity().then(() => { this.identity = null })
  }

  load () {
    this.plugin = (window as any).eosPlugin
    this.plugin.requestIdentity = this.plugin.requestIdentity.bind(this.plugin)

    this.loadPlugin()
  }
}
