import { Injectable } from '@angular/core'
import { BasePluginService } from './base-plugin'
import { EosPluginService } from './eos-plugin.service'
import { ScatterService } from './scatter.service'
import { LocalStorage } from 'ngx-webstorage'

@Injectable()
export class FactoryPluginService {

  @LocalStorage()
  currentPluginName: string

  constructor (
        private eosPluginService: EosPluginService,
        private scatterService: ScatterService
    ) {
    if (!this.currentPluginName) {
      this.currentPluginName = 'scatter'
    }
  }

  get currentPlugin (): BasePluginService {
    switch (this.currentPluginName) {
      case 'scatter':
        return this.scatterService
      case 'eos-plugin':
        return this.eosPluginService
      default:
        return this.scatterService
    }
  }

  setCurrentPlugin (pluginName) {
    this.currentPluginName = pluginName
  }
}
