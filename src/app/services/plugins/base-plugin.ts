import { Injectable } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'

declare var Eos: any

import * as Eos from 'eosjs'

@Injectable()
export abstract class BasePluginService {
  ready: Promise<void>
  plugin: any
  eos: any
  network: any
  identity: any
  name: string
  downloadLink: string

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

  constructor () {
    this.name = 'basePlugin'
  }

  abstract async login ()
  abstract logout ()
  abstract load ()

  protected setNetwork () {
    this.network = {
      blockchain: 'eos',
      protocol: 'https',
      port: this.port,
      host: this.currentNetwork,
      chainId: this.currentChainId
    }
  }

  protected async requestIdentity (identityFunction, networkParametrs) {
    console.log(this.network)
    const identity = await identityFunction(networkParametrs)
    if (!identity) throw new Error()
    this.accountName = identity.accounts[0].name
    this.permission = identity.accounts[0].authority
    this.identity = identity
  }

  protected loadPlugin () {
    this.setNetwork()

    let protocol = this.protocol.substr(0, this.protocol.indexOf('://'))
    this.eos = this.plugin.eos(this.network, Eos, {}, protocol)
  }

}
