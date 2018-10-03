import { Component, OnInit } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry, MatDialogConfig, MatDialog } from '@angular/material'
import { LocalStorage } from 'ngx-webstorage'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

import { AddEditNetworkDialogComponent, ChangeLastNetworkDialogComponent } from '../dialogs'
import { ScatterService, LoginService, ConfigService } from '../services/'
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

  toggleNav: boolean

  get loginIcon () {
    if (!this.isLoggedIn) {
      return 'logo'
    }
    if (this.isLoggedIn === LoginState.scatter) {
      return 'scatter'
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
    private scatterService: ScatterService,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private translate: TranslateService,
    public loginService: LoginService
  ) {
    this.toggleNav = false

    this.networks = []
    this.networks.push(new Network(
      'eosapi.blockmatrix.network',
      'Mainnet (BlockMatrix)',
      NetworkChaindId.MainNet,
      443,
      NetworkProtocol.Https
    ))
    this.networks.push(new Network(
      'eos.greymass.com',
      'Mainnet (Greymass)',
      NetworkChaindId.MainNet,
      443,
      NetworkProtocol.Https
    ))
    this.networks.push(new Network(
      'junglenodes.eosmetal.io',
      'Jungle (Eosmetal)',
      NetworkChaindId.Jungle,
      443,
      NetworkProtocol.Https
    ))
    this.networks.push(new Network(
      'jungle.eos.smartz.io',
      'Jungle (Smartz)',
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

    // suggest new network if logged in with scatter
    if ((this.isLoggedIn === LoginState.scatter) || (this.isLoggedIn == null)) {

      let rez = await this.loginScatter()
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
            rez = await this.loginScatter(false)
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
      this.logout()
    } else if (this.isLoggedIn === LoginState.out) {
      this.logout()
    }

  }

  async loginScatter (forgetIdentity = true) {
    await this.scatterService.ready

    let network = {
      blockchain: 'eos',
      port: this.port,
      host: this.currentNetwork,
      chainId: this.currentChainId
    }

    if (forgetIdentity) {
      await this.scatterService.scatter.forgetIdentity()
    }

    const requiredFields = {
      accounts: [network]
    }
    let isLoginned = false
    await this.scatterService.scatter.getIdentity(requiredFields).then(identity => {
      this.scatterService.scatter.suggestNetwork(network)
      this.accountName = identity.accounts[0].name
      let currentRoute = this.router.url
      this.router.navigate(['/']).then(() => {
        this.router.navigate([currentRoute])
      })
      isLoginned = true
    }).catch(() => {
      isLoginned = false
    })

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
