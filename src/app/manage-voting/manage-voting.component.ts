import { Component, OnInit } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { LoginService } from '../services/login.service'

@Component({
  selector: 'app-manage-voting',
  templateUrl: './manage-voting.component.html',
  styleUrls: [
    './manage-voting.component.scss',
    '../../page-container.styles.scss'
  ]
})
export class ManageVotingComponent {

  constructor (public loginService: LoginService) { }

}
