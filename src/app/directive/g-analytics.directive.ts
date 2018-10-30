import { Directive, ElementRef, Input, HostListener } from '@angular/core'
import { GAnalyticsService } from '../services'

@Directive({
  selector: '[gAnalytics]'
})
export class GAnalyticsDirective {

  @Input()
    gAnalytics: string

  @Input()
    event: string

  @Input()
    category: string

  @Input()
    label: string

  @Input()
    listenTag: string

  constructor (
      private elementRef: ElementRef,
      private gAnalyticsService: GAnalyticsService
      ) {}

  @HostListener('click', ['$event.target']) onClick (element) {
    if (this.listenTag) {
      if (this.listenTag.toUpperCase() === element.tagName) {
        this.gAnalyticsService.gtagEvent(this.event, this.category, this.label)
      }
    } else {
      this.gAnalyticsService.gtagEvent(this.event, this.category, this.label)
    }
  }

}
