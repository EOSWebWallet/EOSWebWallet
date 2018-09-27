import { Component } from '@angular/core'
import { Interact } from '../../models/interact-with-contract.model'
import { LoginService, DialogsService, ButtonBlockService, EosService } from '../../services'
import { TranslateService } from '@ngx-translate/core'
import { IContract } from '../../models/contract.model'
import { IContractFields } from '../../models/contract-fields.model'
import { LocalStorage } from 'ngx-webstorage'
import { EosTypes } from '../../models/eos-types.model'
import * as _ from 'lodash'

@Component({
  selector: 'app-interact-with-contract',
  templateUrl: './interact-with-contract.component.html',
  styleUrls: [
    './interact-with-contract.component.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})
export class InteractWithContractComponent {

  @LocalStorage()
  buttonUsed: boolean
  @LocalStorage()
  accountName: string
  @LocalStorage()
  permission: string

  model: Interact
  network: any
  eos: any
  eosTypes: EosTypes
  fileBase64: any
  abi: any
  fields: IContractFields[]
  contractName: string

  constructor (
    public buttonBlockService: ButtonBlockService,
    public loginService: LoginService,
    private translate: TranslateService,
    private dialogsService: DialogsService) {
    this.buttonUsed = false
    this.model = new Interact()
  }

  ngOnInit () {
    this.eosTypes = EosService.typesEos
  }

  async interact () {
    this.buttonUsed = true

    if (!this.eos) {
      let obj = await this.loginService.setupEos()
      this.eos = obj.eos
      this.network = obj.network
    }

    try {

      if (this.model.account != null) {
        this.contractName = this.model.account.toLowerCase()
      } else {
        this.dialogsService.showFailure('Please fill or select contract')
        this.buttonUsed = false
        return
      }
      let obj = await this.loginService.setupScutterEos()
      let eos = obj.eos
      let network = obj.network

      let contract = await eos.contract(this.contractName)
      console.log(contract)

      this.model.interface = JSON.stringify(contract.fc.abi)
      if (this.model.interface == null) throw new Error(("Abi wasn't successfuly extracted"))
      this.displayActions(contract.fc.abi)
      this.dialogsService.showSuccess(await this.translate.get('common.operation-completed').toPromise())
    } catch (err) {
      this.dialogsService.showFailure(err)
    }
    this.buttonUsed = false
  }

  displayActions (abi: object) {
    try {
      this.abi = abi as IContract
      this.model.actions = this.abi.actions.map(({ name }) => name)
    } catch {
      this.model.actions = []
    }
  }

  onChange () {
    let struct = this.abi.structs.filter(s => s.name === this.model.action)
    this.fields = this.getTypesEos(struct[0].fields as IContractFields[])
  }

  // TODO not yet with data types - all fields are of sting type
  // some actions doesn't have any struct, so it is not possible to know what data should be submitted
  // also it is not possible to get contract name if it was added manually or with attach file functional
  async action () {
    let items: [string, string][]
    items = this.fields.map(f => [f.name, f.value] as [string, string])
    let itemsData = _.fromPairs(items)

    this.dialogsService.showSending(await this.translate.get('dialogs.transaction-wil-be-sent').toPromise(),
     await this.translate.get('dialogs.scatter-should-appear').toPromise())
    let actionsObject = {
      account: this.contractName,
      name: this.model.action,
      authorization: [{ actor: this.accountName, permission: this.permission }],
      data: itemsData
    }

    try {
      await this.eos.transaction({
        actions: [
          actionsObject
        ]
      })
      this.dialogsService.showSuccess(await this.translate.get('common.operation-completed').toPromise())
    } catch (error) {
      if (error.code === 402) {
        this.dialogsService.showInfo(error.message)
      } else {
        this.dialogsService.showFailure(error)
      }
    }

  }

  getTypesEos (fields: IContractFields[]) {
    let fieldsEos: IContractFields[] = []
    for (let i = 0; i < fields.length; i++) {
      fieldsEos = fieldsEos.concat(this.getFieldsRecurse(fields[i]))
    }
    return fieldsEos
  }

  getFieldsRecurse (fieldsStruct: IContractFields): IContractFields[] {
    let fields: IContractFields[] = []
    if (!fieldsStruct.value && fieldsStruct.fields && fieldsStruct.fields.length) {
      fieldsStruct.fields.forEach(field => {
        fields = fields.concat(this.getFieldsRecurse(field))
      })
    } else {
      let typeEos = this.abi.types.filter(s => s.new_type_name === fieldsStruct.type)
      fieldsStruct.typeEos = (typeEos.length) ? typeEos[0].type : fieldsStruct.type

      typeEos = EosService.typesEos.types.filter(s => s.name === fieldsStruct.typeEos)
      fieldsStruct.typeEos = (typeEos.length) ? typeEos[0] : EosService.typesEos.defaultType

      fields.push(fieldsStruct)
    }
    return fields
  }

}
