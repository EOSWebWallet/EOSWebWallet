import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material'

import { ConfigService } from '../services'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.scss',
    '../../page-container.styles.scss'
  ]
})

export class FooterComponent {

  get twitterLink () {
    return ConfigService.settings.twitterLink
  }
  get facebookLink () {
    return ConfigService.settings.facebookLink
  }
  get telegramLink () {
    return ConfigService.settings.telegramLink
  }
  get githubLink () {
    return ConfigService.settings.githubLink
  }

  constructor (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'twitter-icon',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/twitter-icon.svg'))
    iconRegistry.addSvgIcon(
      'facebook-icon',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/facebook-icon.svg'))
    iconRegistry.addSvgIcon(
      'telegram-icon',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/telegram-icon.svg'))
    iconRegistry.addSvgIcon(
      'git-icon',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/git-icon.svg'))
  }

}
