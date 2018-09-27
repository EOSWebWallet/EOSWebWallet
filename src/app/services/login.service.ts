import { Injectable } from '@angular/core'
import { LoginState } from '../models/login-state.model'
import { Router } from '@angular/router'
import { AccountService } from './account.service'
import { ScatterService } from './scatter.service'
import { ConfigService } from './config.service'
import { CryptoService } from './crypto.service'
import { LocalStorage, LocalStorageService } from 'ngx-webstorage'
import { TranslateService } from '@ngx-translate/core'

declare var Eos: any
import * as Eos from 'eosjs'
const { ecc } = Eos.modules

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  scatter: any

  @LocalStorage()
  publicKey: string
  @LocalStorage()
  privateKey: string
  @LocalStorage()
  isLoggedIn: LoginState
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  currentNetwork: string
  @LocalStorage()
  currentChainId: string
  @LocalStorage()
  port: number
  @LocalStorage()
  protocol: string
  @LocalStorage()
  pass: string
  @LocalStorage()
  remember: boolean

  constructor (
    private scatterService: ScatterService,
    private accountService: AccountService,
    private cryptoService: CryptoService,
    private router: Router,
    private storage: LocalStorageService,
    private translations: TranslateService
  ) { }

  loggedIn () {
    if (this.isLoggedIn != null && this.isLoggedIn !== LoginState.out) {
      return true
    } else {
      return false
    }
  }

  withoutPass () {
    if ((this.isLoggedIn === LoginState.publicKey) && (!this.remember)) {
      return true
    } else {
      return false
    }
  }

  async logout () {
    if (this.isLoggedIn === LoginState.scatter && this.scatterService.scatter.identity) {
      await this.scatterService.scatter.forgetIdentity()
    }
    this.isLoggedIn = LoginState.out
    this.router.navigate(['transferTokens'])
    this.removePass()
  }

  removePass () {
    this.storage.clear('pass')
    if (!this.remember) this.storage.clear('hashedpass')
    this.storage.clear('accountName')
    this.storage.clear('permission')
  }

  removePasswordData () {
    this.storage.clear('privateKey')
    this.storage.clear('publicKey')
    this.storage.clear('pass')
    this.storage.clear('accountName')
    this.storage.clear('permission')
    this.storage.clear('hashedpass')
  }

  async getPublicKey (key: string = '') {

    // return public key if private key was provided
    if (key) {
      try {
        return ecc.privateToPublic(key)
      } catch {
        return ''
      }
    }

    // return public key from Scatter
    let network = {
      blockchain: 'eos',
      port: this.port,
      host: this.currentNetwork,
      chainId: this.currentChainId
    }

    const requiredFields = {
      accounts: [ network ]
    }

    const identity = await this.scatterService.scatter.getIdentity(requiredFields)
    return identity.publicKey
  }

  async setupEos () {
    if (this.currentNetwork == null) {
      this.currentNetwork = ConfigService.settings.eos.host
    }

    let net = await this.accountService.getChainInfo().toPromise()
    this.currentChainId = net.chain_id

    let network = {
      blockchain: 'eos',
      port: this.port,
      host: this.currentNetwork,
      chainId: this.currentChainId
    }

    let eos

    const requiredFields = {
      accounts: [ network ]
    }

    if (this.isLoggedIn === LoginState.scatter) {
      await this.scatterService.ready
      if (!this.scatterService) {
        alert(await this.translations.get('errors.scatter-not').toPromise())
        return
      }
      eos = this.scatterService.scatter.eos(network, Eos, {}, 'https')
      const identity = await this.scatterService.scatter.getIdentity(requiredFields)
      const eosAccount = identity.accounts.find(account => account.blockchain === 'eos')
      this.accountName = eosAccount.name
      this.permission = eosAccount.authority
    } else if (this.isLoggedIn === LoginState.publicKey) {

      let decodedPrivateKey = this.cryptoService.decrypt(this.privateKey)

      eos = Eos({
        httpEndpoint: this.protocol + this.currentNetwork + ':' + this.port,
        chainId: this.currentChainId,
        keyProvider: [decodedPrivateKey]
      })

    }
    return {
      network: network,
      eos: eos,
      account: this.accountName
    }
  }

  async setupScutterEos () {
    if (this.currentNetwork == null) {
      this.currentNetwork = ConfigService.settings.eos.host
    }

    let net = await this.accountService.getChainInfo().toPromise()
    this.currentChainId = net.chain_id

    let network = {
      blockchain: 'eos',
      protocol: 'https',
      port: this.port,
      host: this.currentNetwork,
      chainId: this.currentChainId
    }

    let eos

    const requiredFields = {
      accounts: [ network ]
    }

    await this.scatterService.ready
    if (!this.scatterService) {
      alert(await this.translations.get('errors.scatter-not').toPromise())
      return
    }
    // eos = this.scatterService.scatter.eos(network, Eos, {})
    eos = Eos({
      httpEndpoint: this.protocol + this.currentNetwork + ':' + this.port,
      chainId: this.currentChainId,
      keyProvider: [this.scatterService.scatter]
    })
    const identity = await this.scatterService.scatter.getIdentity(requiredFields)
    const eosAccount = identity.accounts.find(account => account.blockchain === 'eos')

    return {
      network: network,
      eos: eos,
      account: eosAccount.name
    }
  }

  async getFullOptions (privateKey: string = '') {
    let options

    if (this.isLoggedIn === LoginState.publicKey) {
      let pubKey = ''

      if ((this.privateKey == null || this.privateKey === '') && (this.publicKey)) {
        pubKey = this.cryptoService.decrypt(this.publicKey)
      } else if (privateKey.length > 0) {
        pubKey = await this.getPublicKey(privateKey)
      } else {
        return {}
      }

      options = {
        broadcast: true,
        sign: true,
        authorization: [{ actor: this.accountName, permission: this.permission }],
        verbose: true,
        keyProvider: pubKey,
        chainId: this.currentChainId // required to sign transaction
      }
    } else {
      options = {
        broadcast: true,
        sign: true,
        authorization: [{ actor: this.accountName, permission: this.permission }],
        verbose: true,
        chainId: this.currentChainId // required to sign transaction
      }
    }
    return options
  }

}
