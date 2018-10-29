import { Component } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'
import { LoginState } from '../models/login-state.model'
import { LoginService, ConfigService } from '../services'

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: [
    './faq.component.scss',
    '../../page-container.styles.scss'
  ]
})

export class FaqComponent {

  @LocalStorage()
  isLoggedIn: LoginState

  constructor (
    public loginService: LoginService,
    private translate: TranslateService) {
  }

  get telegramLink () {
    return ConfigService.settings.telegramLink
  }

  get frameboxLink () {
    return ConfigService.settings.frameboxLink
  }

  telegramLinkReplase (str: string) {
    return str.replace('{{link}}', this.telegramLink)
  }

}
