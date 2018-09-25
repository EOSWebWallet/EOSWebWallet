import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import 'zone.js'
import { AppModule } from './app/app.module'
import { environment } from './environments/environment'
import { ɵHammerGesturesPlugin } from '@angular/platform-browser'
import 'bootstrap'

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err))
