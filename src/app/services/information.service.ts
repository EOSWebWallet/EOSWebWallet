import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

@Injectable()
export class InformationService {

  private messageSource = new BehaviorSubject('Default message')
  currentMessage = this.messageSource.asObservable()

  constructor () {}

  changeMessage (message: string) {
    this.messageSource.next(message)
  }
}
