import { Component } from '@angular/core'
import { LocalStorage } from 'ngx-webstorage'
import { LoginService, DialogsService, ButtonBlockService } from '../../services'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-claim-rewards',
  templateUrl: './claim-rewards.component.html',
  styleUrls: [
    './claim-rewards.component.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})
export class ClaimRewardsComponent {

  owner: string
  network: any
  eos: any

  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string
  @LocalStorage()
  publicKey: string
  @LocalStorage()
  buttonUsed: boolean

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private dialogsService: DialogsService,
    private translate: TranslateService
  ) {
    this.buttonUsed = false
  }

  ngOnInit (){
  }

  async onSubmit () {
    this.buttonUsed = true

    let obj = await this.loginService.setupEos()
    this.eos = obj.eos
    this.network = obj.network

    let optionsTr = {
      broadcast: true,
      sign: true
    }
    const options = { authorization: [`${this.accountName}@${this.permission}`] }

    this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
     await this.translate.get('dialogs.scatter-should-appear').toPromise())

    try {
      await this.eos.transaction(tr => {
        tr.claimrewards(this.owner.toLowerCase(), options)
      }, options)
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
