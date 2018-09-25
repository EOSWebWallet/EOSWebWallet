import { Component } from '@angular/core'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-manage-account-navbar',
  templateUrl: './manage-account-navbar.component.html',
  styleUrls: ['./manage-account-navbar.component.scss']
})
export class ManageAccountNavbarComponent {

  constructor (public loginService: LoginService) { }

}
