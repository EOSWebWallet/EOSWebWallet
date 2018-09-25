import { Component, OnInit, Input } from '@angular/core'
import { Unit, SetRamRate } from '../../../models/set-ram-rate.model'
import { LocalStorage } from 'ngx-webstorage'
import { LoginState } from '../../../models/login-state.model'
import { LoginService, ButtonBlockService, DialogsService } from '../../../services'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-set-ram-rate',
  templateUrl: './set-ram-rate.component.html',
  styleUrls: ['./set-ram-rate.component.scss',
    '../../../../button.styles.scss',
    '../../../../input.style.scss',
    '../../../../page-container.styles.scss'
  ]
})
export class SetRamRateComponent implements OnInit {

  @Input() ramTitle: string
  @Input() ramPlaceholder: string
  @Input() ramError: string
  @Input() ramUnitError: string
  @Input() ramBtn: string

  @LocalStorage()
  isLoggedIn: LoginState
  @LocalStorage()
  buttonUsed: boolean
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string

  model: SetRamRate
  modelUnitRam: string[]
  Unit = Unit

  network: any
  eos: any

  constructor (
    public loginService: LoginService,
    private translate: TranslateService,
    private dialogsService: DialogsService,
    public buttonBlockService: ButtonBlockService
  ) {
    this.modelUnitRam = Object.keys(Unit)
    this.model = (loginService.loggedIn()) ? new SetRamRate(0, this.modelUnitRam[0]) : new SetRamRate(null, this.modelUnitRam[0])
  }

  ngOnInit () {
    this.loginService.setupEos().then(obj => {
      this.eos = obj.eos
      this.network = obj.network
    }).catch(e => console.warn('EOS ERR', e))
  }

  async onSubmit () {
    this.buttonUsed = true
    if (!this.eos) {
      let obj = await this.loginService.setupEos()
      this.eos = obj.eos
      this.network = obj.network
    }

    let options = this.loginService.getFullOptions()

    this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
     await this.translate.get('dialogs.scatter-should-appear').toPromise())

    try {
      await this.eos.transaction({
        actions: [
          {
            account: 'eosio',
            name: 'setramrate',
            authorization: [{ actor: this.accountName, permission: this.permission }],
            data: {
              max_ram_size: this.model.ramSize
            }
          }
        ]
      }, options)
      this.buttonUsed = false
      this.dialogsService.showSuccess(await this.translate.get('common.operation-completed').toPromise())
    } catch (error) {
      this.buttonUsed = false

      if (error.code === 402) {
        this.dialogsService.showInfo(error.message)
      } else {
        this.dialogsService.showFailure(error)
      }
    }
    this.buttonUsed = false
  }
}
