import { Component } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'
import { LoginState } from '../models/login-state.model'
import { LoginService, ConfigService } from '../services'

@Component({
  selector: 'app-our-features',
  templateUrl: './our-features.component.html',
  styleUrls: [
    './our-features.component.scss',
    '../../page-container.styles.scss'
  ]
})

export class OurFeaturesComponent {

  constructor (
    private loginService: LoginService,
    private translate: TranslateService) {
  }

  get telegramLink () {
    return ConfigService.settings.telegramLink
  }

  @LocalStorage()
  isLoggedIn: LoginState

}
