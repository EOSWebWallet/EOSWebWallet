import { Component, OnInit, AfterContentInit } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material'
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-popup-note',
  templateUrl: './popup-note.component.html',
  styleUrls: [
    './popup-note.component.scss',
    '../../page-container.styles.scss'
  ],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        overflow: 'hidden',
        height: '*'
      })),
      state('out', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px'
      })),
      transition('in => out', animate('700ms ease-in-out')),
      transition('out => in', animate('700ms ease-in-out'))
    ])
  ]
})

export class PopupNoteComponent implements OnInit, AfterContentInit {

  helpMenuOpen: string

  @LocalStorage()
  cookieInfo: boolean

  constructor (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
            'close-icon',
            sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/times-solid.svg'))
  }

  ngOnInit () {
    this.helpMenuOpen = 'out'
  }

  ngAfterContentInit () {
    if (!this.cookieInfo) {
      this.cookieInfo = true
      this.helpMenuOpen = 'in'
      setTimeout(() => {
        this.closePopup()
      }, 15000)
    }
  }

  closePopup (): void {
    this.helpMenuOpen = 'out'
  }

}
