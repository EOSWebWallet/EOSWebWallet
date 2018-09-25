import { Component, OnInit } from '@angular/core'
import { LoginService } from '../services/login.service'

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: [
    './contracts.component.scss',
    '../../page-container.styles.scss'
  ]
})
export class ContractsComponent {

  constructor (public loginService: LoginService) { }
}
