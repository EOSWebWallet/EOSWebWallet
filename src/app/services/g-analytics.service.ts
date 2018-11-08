import { Injectable } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { ConfigService } from './config.service'
@Injectable({
  providedIn: 'root'
})

export class GAnalyticsService {

  dataLayer: any

  constructor () {
    this.load()
  }

  load () {
    this.dataLayer = (window as any).dataLayer
    this.gtag('js', new Date())
    this.gtag('config', ConfigService.settings.gtag)
  }

  gtag (...args: any[]) {
    this.dataLayer.push(arguments)
  }

  gtagEvent (event: string, category: string, label: string) {
    this.gtag('event', event, {
      event_category: category,
      event_label: label
    })
  }

}
