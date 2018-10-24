import { Injectable } from '@angular/core'
import { BasePluginService } from './base-plugin'
import { EosPluginService } from './eos-plugin.service'
import { ScatterService } from './scatter.service'

@Injectable()
export class FactoryPluginService {

  private currentPluginName: string

  constructor (
        private eosPluginService: EosPluginService,
        private scatterService: ScatterService
    ) {
    this.currentPluginName = 'scatter'
  }

  get currentPlugin (): BasePluginService {
    switch (this.currentPluginName) {
      case 'scatter':
        return this.scatterService
      case 'eosPlugin':
        return this.eosPluginService
      default:
        return this.scatterService
    }
  }

  setCurrentPlugin (pluginName) {
    this.currentPluginName = pluginName
  }
}
