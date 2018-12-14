import { Component, OnInit } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry, MatDialogConfig, MatDialog } from '@angular/material'
import { LocalStorage } from 'ngx-webstorage'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

import { AddEditNetworkDialogComponent, ChangeLastNetworkDialogComponent, SelectAccountDialogComponent } from '../dialogs'
import { FactoryPluginService, LoginService, ConfigService, CryptoService, AccountService } from '../services/'
import { LoginState } from '../models/login-state.model'
import { Network, NetworkProtocol, NetworkChaindId } from '../models/network.model'

export interface DropdownList {
  value: string
  viewValue: string
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.scss',
    '../../page-container.styles.scss',
    '../../dropdown.scss'
  ]
})
export class NavbarComponent {
  @LocalStorage()
  isLoggedIn: LoginState
  @LocalStorage()
  currentNetwork: string
  @LocalStorage()
  userNetworks: Network[]
  @LocalStorage()
  currentChainId: string
  @LocalStorage()
  currentLanguage: string
  @LocalStorage()
  protocol: string
  @LocalStorage()
  port: number
  @LocalStorage()
  accountName: string
  @LocalStorage()
  selectedLanguage: string
  @LocalStorage()
  selectedNetwork: string
  @LocalStorage()
  selectedIdNetwork: number
  @LocalStorage()
  lastIdNetwork: number
  @LocalStorage()
  currentPluginName: string

  toggleNav: boolean

  get loginIcon () {
    if (!this.isLoggedIn) {
      return 'logo'
    }
    if (this.isLoggedIn === LoginState.plugin) {
      return this.currentPluginName
    } else if (this.isLoggedIn === LoginState.publicKey) {
      return 'publicKey'
    }
    return 'logo'
  }

  languages: DropdownList[] = [
    { value: 'en', viewValue: 'English' },
    { value: 'de', viewValue: 'German' },
    { value: 'fr', viewValue: 'French' },
    { value: 'ru', viewValue: 'Russian' }
  ]

  networks: Network[]

  constructor (
    public dialog: MatDialog,
    private factoryPluginService: FactoryPluginService,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private translate: TranslateService,
    public loginService: LoginService,
    private accountService: AccountService,
    private cryptoService: CryptoService
  ) {
    this.toggleNav = false

    this.networks = []
    this.networks.push(new Network(
      'eos.greymass.com',
      'Mainnet (Greymass)',
      NetworkChaindId.MainNet,
      443,
      NetworkProtocol.Https
    ))
    this.networks.push(new Network(
      'api.eosnewyork.io',
      'Mainnet (EOS New York)',
      NetworkChaindId.MainNet,
      443,
      NetworkProtocol.Https
    ))
    this.networks.push(new Network(
      'api.eosn.io',
      'Mainnet (EOS Nation)',
      NetworkChaindId.MainNet,
      443,
      NetworkProtocol.Https
    ))
    this.networks.push(new Network(
      'api.franceos.fr',
      'Mainnet (Franceos)',
      NetworkChaindId.MainNet,
      443,
      NetworkProtocol.Https
    ))
    this.networks.push(new Network(
      'jungle.eosio.cr',
      'Jungle (Costa Rica)',
      NetworkChaindId.Jungle,
      443,
      NetworkProtocol.Https
    ))
    this.networks.push(new Network(
      'jungle.eos.smartz.io',
      'Jungle 1.0 (Smartz)',
      NetworkChaindId.Jungle,
      443,
      NetworkProtocol.Https
    ))
    this.networks.push(new Network(
      'jungle2.cryptolions.io',
      'Jungle 2.0 (Cryptolines)',
      NetworkChaindId.Jungle,
      443,
      NetworkProtocol.Https
    ))

    if (this.userNetworks) {
      this.userNetworks.forEach(network => {
        this.networks.push(network)
      })
    } else {
      this.userNetworks = []
    }

    if (!this.selectedNetwork) {
      this.networkChanged(0)
    }

    iconRegistry.addSvgIcon(
      'link-icon',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/link.svg'))

    iconRegistry.addSvgIcon(
      'sign-out-icon',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/sign-out.svg'))

    if (this.currentLanguage == null) {
      this.currentLanguage = 'en'
    }
    this.selectedLanguage = this.currentLanguage
    this.translate.use(this.selectedLanguage)

    if (this.currentNetwork == null) {
      this.currentNetwork = ConfigService.settings.eos.host
      this.port = ConfigService.settings.eos.port
      this.protocol = ConfigService.settings.eos.protocol
    }

    if (this.currentNetwork != this.selectedNetwork) {
      this.selectedNetwork = this.currentNetwork
      this.changeChainId()
    }

    if (this.selectedIdNetwork === null) {
      for (let i = 0; i < this.networks.length; i++) {
        if (this.networks[i].host === this.currentNetwork) {
          this.selectedIdNetwork = i
          break
        }
      }
    }

  }

  displayLogOut () {
    if (this.isLoggedIn != null && this.isLoggedIn !== LoginState.out) {
      return true
    } else {
      return false
    }
  }

  activeLink (currentRoute) {
    if (this.router.url.indexOf('/' + currentRoute) === 0) {
      return true
    } else {
      return false
    }
  }

  async logout () {
    await this.loginService.logout()
  }

  langChanged () {
    this.currentLanguage = this.selectedLanguage
    this.translate.use(this.selectedLanguage)
  }

  networkChanged (index: number) {
    this.selectedNetwork = this.networks[index].host
    if (this.selectedNetwork) {
      this.changeChainId(index)
    }
  }

  async changeChainId (index: number = -1) {
    if (index === -1) {
      for (let i = 0; i < this.networks.length; i++) {
        let network = this.networks[i]
        if (network.host === this.currentNetwork) {
          this.setNetwork(i)
          break
        }
      }
    } else {
      this.setNetwork(index)
    }

    // suggest new network if logged in with plugin
    if ((this.isLoggedIn === LoginState.plugin) || (this.isLoggedIn == null)) {

      let rez = await this.loginPlugin()
      if (rez) {
        this.lastIdNetwork = this.selectedIdNetwork
      } else {
        if (this.lastIdNetwork === null) {
          this.logout()
        }

        let dialogRef = this.dialog.open(ChangeLastNetworkDialogComponent)
        await dialogRef.afterClosed().subscribe(async result => {
          if (result) {
            this.selectedNetwork = this.networks[this.lastIdNetwork].host
            this.setNetwork(this.lastIdNetwork)
            rez = await this.loginPlugin(false)
            if (rez) {
              this.lastIdNetwork = this.selectedIdNetwork
            } else {
              this.lastIdNetwork = null
              this.logout()
            }
          } else {
            this.lastIdNetwork = null
            this.logout()
          }
        })
      }
    } else if (this.isLoggedIn === LoginState.publicKey) {
      let isLogin = await this.loginKey()
      if (isLogin) {
        this.lastIdNetwork = this.selectedIdNetwork
      } else {
        if (this.lastIdNetwork === null) {
          this.logout()
        }
        let dialogRef = this.dialog.open(ChangeLastNetworkDialogComponent)
        await dialogRef.afterClosed().subscribe(async result => {
          if (result) {
            this.selectedNetwork = this.networks[this.lastIdNetwork].host
            this.setNetwork(this.lastIdNetwork)
            if (this.loginKey()) {
              this.lastIdNetwork = this.selectedIdNetwork
            } else {
              this.lastIdNetwork = null
              this.logout()
            }
          } else {
            this.lastIdNetwork = null
            this.logout()
          }
        })
      }

    } else if (this.isLoggedIn === LoginState.out) {
      this.logout()
    }
  }

  async loginKey () {
    let pubKey = this.cryptoService.decrypt(this.loginService.publicKey, this.loginService.pass)
    let data
    for (let i = 0; i < 10; i++) {
      data = await this.accountService.findByKey('{"public_key":"' + pubKey + '"}').toPromise()
      if (data && data.account_names.length) {
        break
      }
    }

    if (!data || !data.account_names.length) {
      return false
    }
    let accountNotFoundMesage = this.translate.get('dialogs.account-not-found').toPromise()

    let success = false
    let callback = (accountName = '', permission = ''): void => {
      if (accountName && permission) {
        this.accountName = accountName
        this.loginService.permission = permission
        success = true
      }
    }

    await this.selectPermission(data, callback)
    return success
  }

  async selectPermission (data, callback: (accountName, permission) => any) {
    if (data == null) {
      callback('', '')
      return
    }
    let self = this
    let accounts = []
    for (const account of data.account_names) {
      let permissions = await self.accountService.findByName('{"account_name":"' + account + '"}').toPromise()
      if (permissions) {
        for (const item of permissions.permissions) {
          accounts.push([account.toString(), item.perm_name])
        }
      }
    }
    if (accounts.length === 0) {
      callback('', '')
      return
    }
    const dialogConfig = new MatDialogConfig()
    dialogConfig.closeOnNavigation = false
    dialogConfig.disableClose = true
    dialogConfig.data = { accounts: accounts }

    let dialogRef = this.dialog.open(SelectAccountDialogComponent, dialogConfig)
    const result = await dialogRef.afterClosed().toPromise()
    callback(result.data.split(',')[0], result.data.split(',')[1])
  }

  async loginPlugin (forgetIdentity = true) {
    const currentPlugin = this.factoryPluginService.currentPlugin
    await currentPlugin.ready

    if (forgetIdentity && currentPlugin.plugin.identity) {
      await currentPlugin.plugin.forgetIdentity()
    }

    let isLoginned = false
    try {
      await currentPlugin.login()
      let currentRoute = this.router.url
      this.router.navigate(['/']).then(() => {
        this.router.navigate([currentRoute])
      })
      isLoginned = true
    } catch (error) {
      isLoginned = false
    }

    return isLoginned
  }

  setNetwork (index) {
    this.currentNetwork = this.networks[index].host
    this.currentChainId = this.networks[index].currentChainId
    this.port = this.networks[index].port
    this.protocol = this.networks[index].protocol
    this.selectedIdNetwork = index
  }

  addNetwork () {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.closeOnNavigation = false
    dialogConfig.disableClose = true
    dialogConfig.data = { networks: this.networks }

    let dialogRef = this.dialog.open(AddEditNetworkDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result.data) {
        let arrayUserNetworks = (this.userNetworks) ? this.userNetworks : []
        arrayUserNetworks.push(result.data)
        this.userNetworks = arrayUserNetworks
        this.networks.push(result.data)

        this.selectedNetwork = result.data.host
      }
      if (this.currentNetwork) {
        this.selectedNetwork = this.currentNetwork
      } else {
        if (this.networks.length) {
          this.currentNetwork = this.selectedNetwork = this.networks[0].host
          this.changeChainId()
        }
      }
    })
  }

  editNetwork (index: number) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.closeOnNavigation = false
    dialogConfig.disableClose = true
    dialogConfig.data = { networks: this.networks, network: this.networks[index] }

    let dialogRef = this.dialog.open(AddEditNetworkDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      let dataHostDeleteNetwork = ''
      if (result.data) {

        if (result.data.removed) {
          for (let i = 0; i < this.userNetworks.length; i++) {
            if (this.userNetworks[i] === this.networks[index]) {
              dataHostDeleteNetwork = this.networks[index].host
              this.userNetworks.splice(i, 1)
              this.userNetworks = this.userNetworks
            }
          }
          this.networks.splice(index, 1)
        } else {
          result.data.isCustome = true
          this.networks[index] = result.data
        }

      }
      if (this.currentNetwork && dataHostDeleteNetwork !== this.currentNetwork) {
        this.selectedNetwork = this.currentNetwork
      } else {
        if (this.networks.length) {
          this.currentNetwork = this.selectedNetwork = this.networks[0].host
          this.changeChainId()
        }
      }
    })
  }

}
