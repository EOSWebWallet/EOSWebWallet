import { Component, OnInit } from '@angular/core'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-contracts-navbar',
  templateUrl: './contracts-navbar.component.html',
  styleUrls: ['./contracts-navbar.component.scss']
})
export class ContractsNavbarComponent {

  constructor (public loginService: LoginService) { }

}
