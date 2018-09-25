import { Injectable } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
@Injectable({
  providedIn: 'root'
})

export class ButtonBlockService {
  @LocalStorage()
  buttonUsed: boolean

  buttonBlocked () {
    if (this.buttonUsed === true) {
      return true
    }
    else
      return false
  }
}
