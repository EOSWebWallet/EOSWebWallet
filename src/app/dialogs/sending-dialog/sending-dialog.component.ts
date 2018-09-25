import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

export interface DialogData {
  message: string
  title: string
}

@Component({
  selector: 'app-sending-dialog',
  templateUrl: './sending-dialog.component.html',
  styleUrls: ['./sending-dialog.component.scss']
})
export class SendingDialogComponent {

showMore: any

  constructor (public dialogRef: MatDialogRef<SendingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  close () {
    this.dialogRef.close()
  }

}
