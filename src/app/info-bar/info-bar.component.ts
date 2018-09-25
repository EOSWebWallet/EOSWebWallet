import { Component } from '@angular/core'
import { InfoBarService } from '../services'

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: [
    './info-bar.component.scss',
    '../../page-container.styles.scss',
    '../../progress-bar.styles.scss'
  ]
})
export class InfoBarComponent {

  constructor (public info: InfoBarService) {}

}
