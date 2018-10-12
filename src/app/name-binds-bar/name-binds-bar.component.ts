import { Component, OnInit, HostListener } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { LocalStorage, LocalStorageService } from 'ngx-webstorage'
import { LoginService } from '../services'
import { NameBindsBar } from '../models/name-binds-bar'
import { LoginState } from '../models/login-state.model'
import * as _ from 'lodash'

@Component({
  selector: 'app-name-binds-bar',
  templateUrl: './name-binds-bar.component.html',
  styleUrls: [
    './name-binds-bar.component.scss',
    '../../input.style.scss',
    '../../button.styles.scss',
    '../../table-rez.styles.scss',
    '../../page-container.styles.scss'
  ]
})
export class NameBindsBarComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize (event) {
    this.innerWidth = window.innerWidth
  }

  @LocalStorage()
  isLoggedIn: LoginState

  @LocalStorage()
  accountName: string

  innerWidth: any
  model: NameBindsBar
  modelRez: NameBindsBar
  search: string
  page: number
  limit: number
  countPages: number

  constructor (
    public loginService: LoginService,
    private storage: LocalStorageService
  ) { }

  ngOnInit () {
    this.page = 1
    this.limit = 10
    this.countPages = 0
    this.innerWidth = window.innerWidth
    if (this.isLoggedIn && this.isLoggedIn !== LoginState.out) {
      this.getBinds()
    }

    this.storage.observe('currentnetwork').subscribe(() => {
      if (this.isLoggedIn && this.isLoggedIn !== LoginState.out) {
        this.Refresh()
      }
    }, (error) => {
      console.log(error)
    })
  }

  public Refresh () {
    this.search = ''
    this.getBinds()
  }

  async getBinds () {
    this.model = { binds: [] }
    this.modelRez = { binds: [] }
    const obj = await this.loginService.setupEos()
    const eos = obj.eos

    eos.getTableRows(true, 'eosio', 'eosio', 'namebids', '', '', '', -1).then(binds => {
      if (binds && binds.rows.length) {
        this.model.binds = binds.rows
        this.viewRezult()
      }
    })
  }

  searchNew () {
    this.page = 1
    this.viewRezult()
  }

  viewRezult () {
    this.modelRez.binds = this.getBindsPage()
  }

  getBindsPage () {
    let rez = this.model.binds
    if (this.search) {
      rez = _.filter(this.model.binds, bind => {
        return !!(bind.newname.indexOf(this.search) + 1)
      })
    }
    this.countPages = Math.ceil(rez.length / this.limit)

    let rezPage = []
    const from = this.limit * (this.page - 1)
    const to = from + this.limit
    for (let i = from; i < rez.length && i < to; i++) {
      rezPage.push(rez[i])
    }
    // this.page = 1
    return rezPage
  }
}
