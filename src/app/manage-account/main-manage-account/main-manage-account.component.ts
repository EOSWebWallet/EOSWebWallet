import { Component, OnInit } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { LoginState } from '../../models/login-state.model'
import { LoginService } from '../../services/login.service'
import { SideBarComponent } from '../../side-bar/side-bar.component'

@Component({
  selector: 'app-main-manage-account',
  templateUrl: './main-manage-account.component.html',
  styleUrls: ['./main-manage-account.component.scss', '../../../page-container.styles.scss']
})

export class MainManageAccountComponent {

  @LocalStorage()
  isLoggedIn: LoginState

  constructor (public loginService: LoginService) {}

}
