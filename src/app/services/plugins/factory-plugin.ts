import { Injectable } from '@angular/core'
import { BasePluginService } from './base-plugin'
import { EosPluginService } from './eos-plugin.service'
import { ScatterService } from './scatter.service'

@Injectable()
export class FactoryPluginService {
  constructor (
        private basePluginService: BasePluginService,
        private eosPluginService: EosPluginService,
        private scatterService: ScatterService
    ){}

  get currentPlugin (): BasePluginService {
    return this.scatterService
  }
}
