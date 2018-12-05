import { Component } from '@angular/core'
import { InfoBarService, LoginService } from '../services'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: [
    '../../icon.styles.scss',
    '../../button.styles.scss',
    './info-bar.component.scss',
    '../../page-container.styles.scss',
    '../../progress-bar.styles.scss',
    '../../tooltip.style.scss'
  ]
})
export class InfoBarComponent {
  faQuestionCircle = faQuestionCircle

  constructor (public info: InfoBarService) {}
}
