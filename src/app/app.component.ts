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

  constructor (private router: Router) {
  }

  displayOneContent() {
    if ((this.isLoggedIn != null && this.isLoggedIn !== LoginState.out)
      || (  this.router.url == "/login"))
       return true;
    else
       return false;
  }

  hideLogin () {
    if ((this.router.url === '/generateKeyPairs') || (this.router.url === '/findAccount')) {
      return true
    }
    else {
      return false
    }
  }

  displayInfoBar () {
    if (this.isLoggedIn != null && this.isLoggedIn !== LoginState.out)
      return true
    else
      return false
  }

  title = 'app'
}
