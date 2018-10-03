import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

export interface DialogData {}

@Component({
  selector: 'app-change-last-network-dialog',
  templateUrl: './change-last-network-dialog.component.html',
  styleUrls: [
    './change-last-network-dialog.component.scss',
    '../../../icon.styles.scss',
    '../../../input.style.scss',
    '../../../button.styles.scss',
    '../../../page-container.styles.scss'
  ]
})
export class ChangeLastNetworkDialogComponent implements OnInit {

  index: number = 0
  maxIndex: number = 0
  networkExists: boolean = false

  constructor (public dialogRef: MatDialogRef<ChangeLastNetworkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit () {}

  success () {
    this.dialogRef.close(true)
  }

  close () {
    this.dialogRef.close(false)
  }

}
