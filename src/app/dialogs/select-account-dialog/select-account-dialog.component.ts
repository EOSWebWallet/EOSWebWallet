import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

export interface DialogData {
  accounts: [string, string][]
}

@Component({
  selector: 'app-select-account-dialog',
  templateUrl: './select-account-dialog.component.html',
  styleUrls: [
    './select-account-dialog.component.scss',
    '../../../button.styles.scss'
  ]
})
export class SelectAccountDialogComponent implements OnInit {

  model: string
  index: number = 0
  maxIndex: number = 0

  constructor (public dialogRef: MatDialogRef<SelectAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.index = 0
    this.maxIndex = this.data.accounts.length - 1
    if (this.maxIndex > 0) {
      this.model = this.data.accounts[this.index].join()
    }
  }

  ngOnInit() {
  }

  keypress (event: KeyboardEvent) {
    if (this.maxIndex > 0) {
      if (event.key === 'ArrowUp') {
        this.index = (this.index > 0) ? this.index - 1 : this.maxIndex
      }
      if (event.key === 'ArrowDown') {
        this.index = (this.index < this.maxIndex) ? this.index + 1 : 0
      }
    }

    this.model = this.data.accounts[this.index].join()
  }

  selectAccount (i: number) {
    this.index = i
  }

  onSubmit () {
    let value = this.model
    if (value) {
      this.dialogRef.close({ data: value })
    }
  }

}
