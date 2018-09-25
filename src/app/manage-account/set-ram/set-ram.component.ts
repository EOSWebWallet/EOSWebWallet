import { Component, OnInit } from '@angular/core'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-set-ram',
  templateUrl: './set-ram.component.html',
  styleUrls: ['./set-ram.component.scss',
    '../../../button.styles.scss',
    '../../../input.style.scss',
    '../../../page-container.styles.scss'
  ]
})

export class SetRamComponent implements OnInit {

  constructor(public loginService: LoginService) {  }

  ngOnInit () {  }

}
