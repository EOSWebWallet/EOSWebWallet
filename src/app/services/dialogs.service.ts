import { Injectable } from '@angular/core'
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component'
import { FailureDialogComponent } from '../dialogs/failure-dialog/failure-dialog.component'
import { SendingDialogComponent } from '../dialogs/sending-dialog/sending-dialog.component'
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component'
import { MatDialog, MatDialogConfig } from '@angular/material'

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor (public dialog: MatDialog) { }

  showSuccess (messageText: string) {
    this.dialog.closeAll()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.closeOnNavigation = true
    dialogConfig.data = { message: messageText }
    let dialogRef = this.dialog.open(SuccessDialogComponent, dialogConfig)
  }

  showFailure (messageText: any) {
    this.dialog.closeAll()

    let message: string
    try {
      let json = JSON.parse(messageText.toString())
      if (json.error.details[0].message) message = json.error.details[0].message
      else if (json.message) message = json.message
    } catch {
      if (messageText.message) message = messageText.message
      else message = messageText.toString()
    }

    const dialogConfig = new MatDialogConfig()
    dialogConfig.closeOnNavigation = true
    dialogConfig.data = { message: message }
    let dialogRef = this.dialog.open(FailureDialogComponent, dialogConfig)
  }

  showSending (messageText: string, title: string) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.closeOnNavigation = true
    dialogConfig.data = { message: messageText, title }
    let dialogRef = this.dialog.open(SendingDialogComponent, dialogConfig)
  }

  showInfo (messageText: string) {
    this.dialog.closeAll()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.closeOnNavigation = true
    dialogConfig.disableClose = true
    dialogConfig.data = { message: messageText }
    let dialogRef = this.dialog.open(InfoDialogComponent, dialogConfig)
  }

  closeAll () {
    this.dialog.closeAll()
  }

}
