import { Input, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: [
    './side-bar.component.scss',
    '../../page-container.styles.scss'
  ]
})
export class SideBarComponent implements OnInit {
  info: string

  constructor (private translate: TranslateService, private router: Router) {
    router.events.subscribe(async (val) => {
      let path = this.router.url.substr(1).replace('/','.')
      this.info = await this.translate.get('info.' + path).toPromise()
    })
    translate.onLangChange.subscribe(async (val) => {
      let path = this.router.url.substr(1).replace('/','.')
      this.info = await this.translate.get('info.' + path).toPromise()
    })
  }

  async ngOnInit () {
    let path = this.router.url.substr(1).replace('/','.')
    let translationKey = 'info.' + path
    if (translationKey == 'info.') translationKey = 'info.transferTokens'
    this.info = await this.translate.get(translationKey).toPromise()
  }

}
