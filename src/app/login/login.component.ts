import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Subscription } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import * as CryptoJS from 'crypto-js'
import * as Eos from 'eosjs'
import { LocalStorage, LocalStorageService } from 'ngx-webstorage'
import { FactoryPluginService, ScatterService, LoginService, ConfigService, AccountService, CryptoService, GAnalyticsService } from '../services'
import { LoginState } from '../models/login-state.model'
import { LoginKeys } from '../models/login-keys.model'
import { SelectAccountDialogComponent } from '../dialogs/select-account-dialog/select-account-dialog.component'
import { FailureDialogComponent } from '../dialogs/failure-dialog/failure-dialog.component'
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component'

declare var Eos: any
const { ecc } = Eos.modules

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    '../../input.style.scss',
    '../../button.styles.scss',
    '../../page-container.styles.scss',
    '../../icon.styles.scss'
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription

  faQuestionCircle = faQuestionCircle
  returnUrl: string
  network: any
  eos: any

  login: any
  hoverScatter: boolean
  hoverEosPlugin: boolean
  hoverKey: boolean
  showKeyLogin: boolean

  @LocalStorage()
  isLoggedIn: LoginState

  @LocalStorage()
  remember: boolean

  @LocalStorage()
  privateKey: string

  @LocalStorage()
  publicKey: string

  @LocalStorage()
  accountName: string

  @LocalStorage()
  permission: string

  @LocalStorage()
  pass: string

  @LocalStorage()
  hashedPass: string

  @LocalStorage()
  currentNetwork: string

  @LocalStorage()
  selectedIdNetwork: number

  @LocalStorage()
  lastIdNetwork: number

  model = new LoginKeys('','',false,'','','')
  loginInProcess = false

  constructor (
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private factoryPluginService: FactoryPluginService,
    private accountService: AccountService,
    private cryptoService: CryptoService,
    private storage: LocalStorageService,
    public loginService: LoginService,
    private translations: TranslateService,
    private gAnalyticsService: GAnalyticsService
  ) {

    this.storage.observe('currentnetwork').subscribe(() => {
      if (this.model.publicKey && (this.isLoggedIn == null || this.isLoggedIn === LoginState.out)) {
        this.publicKey = ''
        this.accountName = ''
        this.permission = ''
        this.privateKey = ''
        this.model.accountName = ''
        this.model.publicKey = ''
        this.model.privateKey = ''
        this.model.permission = ''
        // this.onPrivatePass({ target: { value: this.model.privateKey } })
      }
    }, (error) => {
      console.log(error)
    })

  }

  ngOnInit () {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  get passBase64 () {
    if (!this.model.remember) {
      this.model.pass = 'bhfeuYVITYUVbhfeuYVITYUVbhfeuYVITYUVbhfeuYVITYUVbhfeuYVITYUV'
    }
    return this.cryptoService.btoa(this.model.pass)
  }

  async loginEosPlugin () {
    this.factoryPluginService.setCurrentPlugin('eos-plugin')
    await this.loginPlugin()
  }

  async loginScatter () {
    this.factoryPluginService.setCurrentPlugin('scatter')
    await this.loginPlugin()
  }

  async loginPlugin () {
    if (this.loginInProcess) return
    this.loginInProcess = true
    const currentPlugin = this.factoryPluginService.currentPlugin

    this.factoryPluginService.currentPlugin.ready.then(async () => {
      try {
        await currentPlugin.login()

        this.loginInProcess = false
        this.isLoggedIn = LoginState.plugin
        this.lastIdNetwork = this.selectedIdNetwork
        this.navigateAfterLogin()
      } catch (error) {
        if (error.code === 423) {
          this.loginInProcess = false
          const dialogConfig = new MatDialogConfig()
          dialogConfig.closeOnNavigation = true
          dialogConfig.disableClose = true
          dialogConfig.data = {
            message: error.message,
            title: await this.translations.get(`dialogs.${currentPlugin.name}-locked`).toPromise()
          }
          let dialogRef = this.dialog.open(InfoDialogComponent, dialogConfig)
        } else if (error.code === 402) {
          this.loginInProcess = false
        } else {
          this.loginInProcess = false
          const dialogConfig = new MatDialogConfig()
          dialogConfig.closeOnNavigation = true
          dialogConfig.disableClose = true
          dialogConfig.data = { message: error.message }
          let dialogRef = this.dialog.open(FailureDialogComponent, dialogConfig)
        }
      }
    }).catch(async () => {
      this.loginInProcess = false
      const dialogConfig = new MatDialogConfig()
      dialogConfig.closeOnNavigation = true
      dialogConfig.disableClose = true
      dialogConfig.data = {
        content: await this.translations.get('dialogs.you-have', { link: ConfigService.settings.scatterLink }).toPromise(),
        activeGAnalytic: true
      }
      this.gAnalyticsService.gtagEvent('02_modal_impr', 'connect_account', 'scatter')
      let dialogRef = this.dialog.open(InfoDialogComponent, dialogConfig)
    })
  }

  async selectPermission (data, callback: () => any) {

    if (data == null) {
      callback()
      return
    }

    let accounts = []
    for (const account of data.account_names) {
      let permissions = await this.accountService.findByName('{"account_name":"' + account + '"}').toPromise()
      if (permissions) {
        for (const item of permissions.permissions) {
          accounts.push([account.toString(),item.perm_name])
        }
      }
    }

    if (accounts.length === 0) {
      callback()
      return
    }

    const dialogConfig = new MatDialogConfig()
    dialogConfig.closeOnNavigation = false
    dialogConfig.disableClose = true
    dialogConfig.data = { accounts: accounts }

    let dialogRef = this.dialog.open(SelectAccountDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      this.model.accountName = result.data.split(',')[0]
      this.model.permission = result.data.split(',')[1]
      callback()
    })
  }

  async onPrivatePass (event) {
    try {
      let publicKey: string
      try {
        publicKey = ecc.privateToPublic(event.target.value)
      } catch {
        this.model.publicKey = ''
        this.model.accountName = ''
        this.model.permission = ''
        return
      }

      if (this.model.publicKey === publicKey) return
      this.model.publicKey = publicKey

      let data = await this.accountService.findByKey('{"public_key":"' + publicKey + '"}').toPromise()
      if (!data || !data.account_names.length) {
        const dialogConfig = new MatDialogConfig()
        dialogConfig.closeOnNavigation = true
        dialogConfig.data = { message: await this.translations.get('dialogs.account-not-found').toPromise() }
        let dialogRef = this.dialog.open(InfoDialogComponent, dialogConfig)
        this.loginInProcess = false
        return
      }

      let accountNotFoundMesage = await this.translations.get('dialogs.account-not-found').toPromise()

      let callback = (): void => {
        if (this.model.permission == null) {
          const dialogConfig = new MatDialogConfig()
          dialogConfig.closeOnNavigation = true
          dialogConfig.data = { message: accountNotFoundMesage }
          let dialogRef = this.dialog.open(InfoDialogComponent, dialogConfig)
          this.loginInProcess = false
          return
        }
        this.lastIdNetwork = this.selectedIdNetwork
      }

      await this.selectPermission(data, callback)

    } catch (err) {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.closeOnNavigation = true
      dialogConfig.data = { message: err }
      let dialogRef = this.dialog.open(FailureDialogComponent, dialogConfig)
      this.loginInProcess = false
    }
  }

  async loginPublicKey () {
    if (this.model.accountName == null || this.model.accountName === '') return
    if (this.loginInProcess) return
    this.loginInProcess = true

    if (this.currentNetwork == null) {
      this.currentNetwork = ConfigService.settings.eos.host
    }

    let cipherKey
    let hashedPass

    this.accountName = this.model.accountName
    this.permission = this.model.permission

    if (this.passBase64) {
      ({ cipherKey, hashedPass } = this.cryptoService.encrypt(this.model.publicKey, this.passBase64))
      this.publicKey = cipherKey;
      ({ cipherKey, hashedPass } = this.cryptoService.encrypt(this.model.privateKey, this.passBase64))
      this.privateKey = cipherKey

      this.pass = this.passBase64
      this.hashedPass = hashedPass
    }

    this.gAnalyticsService.gtagEvent('02_log_in', 'connect_account', 'private_key')

    this.isLoggedIn = LoginState.publicKey
    this.remember = this.model.remember
    this.loginInProcess = false
    this.lastIdNetwork = this.selectedIdNetwork
    this.navigateAfterLogin()
  }

  async loginPublicKeyPassword () {
    if (this.loginInProcess) return
    this.loginInProcess = true
    this.model.remember = true

    if (this.hashedPass !== (CryptoJS.SHA256(this.passBase64)).toString()) {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.closeOnNavigation = true
      dialogConfig.data = { message: await this.translations.get('dialogs.wrong-password').toPromise() }
      let dialogRef = this.dialog.open(InfoDialogComponent, dialogConfig)
      this.loginInProcess = false
      return
    }

    let pubKey = this.cryptoService.decrypt(this.publicKey, this.passBase64)
    let data = await this.accountService.findByKey('{"public_key":"' + pubKey + '"}').toPromise()

    if (!data || !data.account_names.length) {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.closeOnNavigation = true
      dialogConfig.data = { message: await this.translations.get('dialogs.account-not-found').toPromise() }
      let dialogRef = this.dialog.open(InfoDialogComponent, dialogConfig)
      this.loginInProcess = false
      return
    }

    let accountNotFoundMesage = this.translations.get('dialogs.account-not-found').toPromise()

    let callback = (): void => {
      if (this.model.permission == null) {
        const dialogConfig = new MatDialogConfig()
        dialogConfig.closeOnNavigation = true
        dialogConfig.data = { message: accountNotFoundMesage }
        let dialogRef = this.dialog.open(InfoDialogComponent, dialogConfig)
        this.loginInProcess = false
        return
      }

      this.accountName = this.model.accountName
      this.permission = this.model.permission
      this.pass = this.passBase64
      this.isLoggedIn = LoginState.publicKey
      this.loginInProcess = false
      this.lastIdNetwork = this.selectedIdNetwork
      this.navigateAfterLogin()
    }

    await this.selectPermission(data, callback)
  }

  navigateAfterLogin () {
    if (this.returnUrl === '/') {
      this.returnUrl = this.router.url === '/login' ? '/transferTokens' : this.router.url
    }
    this.router.navigateByUrl(this.returnUrl)
  }

  logout () {
    this.factoryPluginService.currentPlugin.logout()
    this.isLoggedIn = LoginState.out
    this.storage.clear('pass')
  }

  async onSubmit () {
    await this.loginPublicKey()
  }

  loggedIn () {
    return (this.isLoggedIn != null && this.isLoggedIn !== LoginState.out)
  }

  showEnterPassword () {
    if (this.loggedIn() === false && this.privateKey && this.remember) {
      return true
    } else {
      return false
    }
  }

  ngOnDestroy () {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
