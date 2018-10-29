import { Component } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { LoginState } from './models/login-state.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    '../page-container.styles.scss',
    './app.component.scss'
  ]
})
export class AppComponent {
  @LocalStorage()
  isLoggedIn: LoginState
  @LocalStorage()
  state: boolean

  title = 'app'

  constructor (private router: Router) {
  }

  displayOneContent () {
    return (this.isLoggedIn != null && this.isLoggedIn !== LoginState.out) ||
      (this.router.url === '/login')
  }

  hideLogin () {
    return (
      (this.router.url === '/generateKeyPairs') ||
      (this.router.url === '/findAccount') ||
      (this.router.url === '/faq') ||
      (this.router.url === '/ourFeatures')
    )
  }

  displayInfoBar () {
    return (this.isLoggedIn != null && this.isLoggedIn !== LoginState.out)
  }

}
