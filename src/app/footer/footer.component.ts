import { Component, OnInit } from '@angular/core'

import { DomSanitizer } from '@angular/platform-browser'
import { MatIconModule, MatIconRegistry } from '@angular/material'


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.scss',
    '../../page-container.styles.scss'
  ]
})

export class FooterComponent implements OnInit {

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

  ngOnInit() {
  }

}
