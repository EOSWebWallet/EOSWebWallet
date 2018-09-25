import { Injectable } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { LocalStorage } from 'ngx-webstorage'
import { LoginState } from '../models/login-state.model'

@Injectable()
export class AuthGuardService implements CanActivate {
  @LocalStorage()
  public isLoggedIn : LoginState

  constructor (private router: Router) {}

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isLoggedIn == LoginState.ewb || this.isLoggedIn == LoginState.publicKey
                                          || this.isLoggedIn == LoginState.scatter ) {
      return true
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false
  }
}
