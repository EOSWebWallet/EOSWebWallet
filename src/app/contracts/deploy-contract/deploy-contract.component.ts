import { Component } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { DeployContract } from '../../models/deploy-contract.model'
import { TranslateService } from '@ngx-translate/core'

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }
}

@Component({
  selector: 'app-deploy-contract',
  templateUrl: './deploy-contract.component.html',
  styleUrls: [
    './deploy-contract.component.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})
export class DeployContractComponent {
  model: DeployContract
  network: any
  eos: any
  @LocalStorage()
  publicKey: string
  @LocalStorage()
  buttonUsed: boolean
  @LocalStorage()
  currentPluginName: string

  fileBase64: any

  byteCodeControl = new FormControl('', [
    Validators.required,
    Validators.email
  ])

  matcher = new MyErrorStateMatcher()

  constructor (public loginService: LoginService,
    private translate: TranslateService,
    private dialogsService: DialogsService,public buttonBlockService: ButtonBlockService) {
    this.model = new DeployContract()
    this.buttonUsed = false
  }

  async attachFile (event, file) {
    let input = event.target
    const reader = new FileReader()

    let self = this
    reader.onload = function () {
      self.fileBase64 = reader.result.slice(reader.result.indexOf(';base64,')).slice(8);
      (document.getElementById('byteCode') as HTMLInputElement).value = atob(self.fileBase64)
      self.model.byteCode = atob(self.fileBase64)
    }
    reader.readAsDataURL(input.files[0])
  }

  async deployContract () {
    this.buttonUsed = true
    try {
      if (!this.eos) {
        let obj = await this.loginService.setupEos()
        this.eos = obj.eos
        this.network = obj.network
      }

      this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
       await this.translate.get(`dialogs.${this.currentPluginName}-should-appear`).toPromise())

      await this.eos.setcode(this.model.account.toLowerCase(), this.model.type, this.model.version, this.model.byteCode)
      this.dialogsService.showSuccess(await this.translate.get('common.operation-completed').toPromise())
    } catch (error) {
      if (error.code === 402) {
        this.dialogsService.showInfo(error.message)
      } else {
        this.dialogsService.showFailure(error)
      }
    }
    this.buttonUsed = false
  }
}
