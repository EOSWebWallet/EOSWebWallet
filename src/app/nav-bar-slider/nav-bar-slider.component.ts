import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core'
import { LoginService } from '../services/login.service'

@Component({
  selector: 'app-nav-bar-slider',
  templateUrl: './nav-bar-slider.component.html',
  styleUrls: [
    './nav-bar-slider.component.scss',
    '../../menu-navbar.styles.scss'
  ]
})

export class NavBarSliderComponent {

  @ViewChild('sliderWrapp') sliderWrapp: ElementRef
  @ViewChild('linksWrapp') linksWrapp: ElementRef

  posLeftsliderWrapp: number
  showLeftArrowNav: boolean
  showRightArrowNav: boolean

  constructor (public loginService: LoginService) {
  }

  ngOnInit () {
    this.init()
  }

  init () {
    this.posLeftsliderWrapp = 0
    this.showLeftArrowNav = false
    this.showRightArrowNav = true
  }

  moveNav (direction: string) {
    this.showLeftArrowNav = true
    this.showRightArrowNav = true

    let moveSize = 150
    let moveMaxPosition = 0
    let moveLenth = 0
    let widthLinkWrapp = this.linksWrapp.nativeElement.offsetWidth
    let widthbsliderWrapp = this.sliderWrapp.nativeElement.offsetWidth
    let posLeftsliderWrapp = this.posLeftsliderWrapp

    if (direction === 'right') {
      moveLenth = (posLeftsliderWrapp + widthLinkWrapp) - widthbsliderWrapp - 1
      moveSize = this.minMove(moveLenth, moveSize)

      if (moveLenth > 0) {
        this.posLeftsliderWrapp -= moveSize
      }
      if (moveLenth - moveSize <= 0) {
        this.showRightArrowNav = false
      }
    } else {
      moveLenth = -posLeftsliderWrapp
      moveSize = this.minMove(this.posLeftsliderWrapp, moveSize)

      if (moveLenth > 0) {
        this.posLeftsliderWrapp += moveSize
      } else {
        this.posLeftsliderWrapp = moveMaxPosition
      }
      if (moveLenth - moveSize <= 0) {
        this.showLeftArrowNav = false
      }
    }
  }

  minMove (number1: number, number2: number): number {
    return Math.min(Math.abs(number1), Math.abs(number2))
  }

}
