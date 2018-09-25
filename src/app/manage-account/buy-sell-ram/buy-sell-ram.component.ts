import { Component } from '@angular/core'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-buy-sell-ram',
  templateUrl: './buy-sell-ram.component.html',
  styleUrls: ['./buy-sell-ram.component.scss', '../../../page-container.styles.scss']
})

export class BuySellRamComponent {
  constructor(public loginService: LoginService) { }
}
