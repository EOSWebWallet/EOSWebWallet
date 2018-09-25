import { Injectable } from '@angular/core'
import { ConfigService } from './config.service'
import { LocalStorage } from 'ngx-webstorage'
import * as CryptoJS from 'crypto-js'

@Injectable()
export class CryptoService {

  @LocalStorage()
  pass: string

  atob (encodedPassword: string) {
    return decodeURIComponent(escape(atob(encodedPassword)))
  }

  btoa (password: string) {
    return btoa(unescape(encodeURIComponent(password)))
  }

  encrypt (key: string, pass = this.pass) {
    let base64Pass = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(this.atob(pass)))
    let iv = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(ConfigService.settings.vector))

    let cipherKey = CryptoJS.AES.encrypt(key, base64Pass, { iv: iv }).toString()
    let hashedPass = (CryptoJS.SHA256(pass)).toString()

    return { cipherKey, hashedPass }
  }

  decrypt (key: string, pass = this.pass) {
    let base64Pass = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(this.atob(pass)))
    let iv = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(ConfigService.settings.vector))

    let bytes = CryptoJS.AES.decrypt(key, base64Pass, { iv: iv })
    let encodedTextKey = bytes.toString(CryptoJS.enc.Utf8)

    return encodedTextKey
  }
}
