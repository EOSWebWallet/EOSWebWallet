import { Component } from '@angular/core'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-other-navbar',
  templateUrl: './other-navbar.component.html',
  styleUrls: ['./other-navbar.component.scss']
})
export class OtherNavbarComponent {

  constructor (public loginService: LoginService) { }

}
