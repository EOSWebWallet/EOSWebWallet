import { Component, OnInit, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Network, NetworkChaindId, NetworkProtocol } from '../../models/network.model'
import { isNull } from 'util'

export interface DialogData {
  networks: Network[],
  network: Network
}

@Component({
  selector: 'app-add-edit-network-dialog',
  templateUrl: './add-edit-network-dialog.component.html',
  styleUrls: [
    './add-edit-network-dialog.component.scss',
    '../../../icon.styles.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})
export class AddEditNetworkDialogComponent implements OnInit {

  index: number = 0
  maxIndex: number = 0
  networkExists: boolean = false

  myForm: FormGroup

  getNetworkChaindId () {
    return Object.values(NetworkChaindId)
  }

  getProtocols () {
    return Object.values(NetworkProtocol)
  }

  constructor (public dialogRef: MatDialogRef<AddEditNetworkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit () {
    if (this.data.network) {
      this.myForm = new FormGroup({
        'host': new FormControl(this.data.network.host, [Validators.required, this.hostValidator.bind(this)]),
        'viewValue': new FormControl(this.data.network.viewValue, Validators.required),
        'currentChainId': new FormControl(this.data.network.currentChainId, Validators.required),
        'port': new FormControl(this.data.network.port, Validators.required),
        'protocol': new FormControl(this.data.network.protocol, Validators.required),
        'isCustome': new FormControl(true)
      })
    } else {
      this.myForm = new FormGroup({
        'host': new FormControl('', [Validators.required, this.hostValidator.bind(this)]),
        'viewValue': new FormControl('', Validators.required),
        'currentChainId': new FormControl('', Validators.required),
        'port': new FormControl('', Validators.required),
        'protocol': new FormControl('', Validators.required),
        'isCustome': new FormControl(true)
      })
    }
  }

  onSubmit () {
    let value = this.myForm.value

    if (this.myForm && this.myForm.valid && !this.networkExists) {
      this.dialogRef.close({ data: this.myForm.value })
    }
  }

  deleteNetwork () {
    this.dialogRef.close({ data: { removed: true } })
  }

  closeForm () {
    this.dialogRef.close({ data: null })
  }

  hostValidator (control: FormControl): {[s: string]: boolean} {
    for (let i = 0; i < this.data.networks.length; i++) {
      if (this.data.networks[i].host.toUpperCase() === control.value.toUpperCase()) {
        if (this.data.network && this.data.network.host.toUpperCase() === control.value.toUpperCase()) {
          break
        }
        this.networkExists = true
        return { 'port': true }
      }
    }
    this.networkExists = false
    return null
  }

  checkValidForm () {
    Object.keys(this.myForm.controls).forEach(field => {
      const control = this.myForm.get(field)
      control.updateValueAndValidity()
    })
  }

}
