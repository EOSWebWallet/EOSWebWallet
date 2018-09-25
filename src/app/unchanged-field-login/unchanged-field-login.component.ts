import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-unchanged-field-login',
  templateUrl: './unchanged-field-login.component.html',
  styleUrls: ['./unchanged-field-login.component.scss']
})
export class UnchangedFieldLoginComponent implements OnInit {


  @Input() class: string
  @Input() messageTitle: string
  @Input() messageValue: string

  isBold:boolean

  @Input() set bold(value: string) {
    this.isBold = value == "true"
  }

  constructor() { }

  ngOnInit() {
  }

}
