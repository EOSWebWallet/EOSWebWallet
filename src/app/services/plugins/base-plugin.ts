import { Injectable } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'

declare var Eos: any

import * as Eos from 'eosjs'

@Injectable()
export class BasePluginService {
  ready: Promise<void>
  plugin: any
  eos: any
  network: any
  identity: any
  name: string

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

  async login (successCallback, errorCallbak) {
  }

  logout () {
  }

  load () {
  }
}
