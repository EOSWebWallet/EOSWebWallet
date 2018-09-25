import { Component, OnInit } from '@angular/core'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-manage-voting-navbar',
  templateUrl: './manage-voting-navbar.component.html',
  styleUrls: ['./manage-voting-navbar.component.scss']
})
export class ManageVotingNavbarComponent {

  constructor (public loginService: LoginService) { }

}
