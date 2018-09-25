import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

export interface DialogData {
  message: string
}

@Component({
  selector: 'app-failure-dialog',
  templateUrl: './failure-dialog.component.html',
  styleUrls: ['./failure-dialog.component.scss']
})
export class FailureDialogComponent {

showMore: any

  constructor (public dialogRef: MatDialogRef<FailureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  close () {
    this.dialogRef.close()
  }

}
