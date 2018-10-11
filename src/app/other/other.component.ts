import { Component, OnInit } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { LoginService } from '../services/login.service'
import { InformationService } from '../services/information.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: [
    './other.component.scss',
    '../../input.style.scss',
    '../../button.styles.scss',
    '../../page-container.styles.scss'
  ]
})
export class OtherComponent implements OnInit {
  message: string

  constructor (
    public loginService: LoginService,
    private infoService: InformationService,
    private router: Router
  ) {
    this.infoService.currentMessage.subscribe(message => this.message = message)
  }

  ngOnInit () {}

  get isbindOnName () {
    return this.router.url.startsWith('/other/premiumName')
  }

}
