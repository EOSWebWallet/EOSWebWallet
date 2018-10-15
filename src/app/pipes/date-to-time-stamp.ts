import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'dateCheck'
})

export class DateCheckPipe implements PipeTransform {
  transform (value: any, args?: any): any {
    if (Number(value) && value.length > 10) {
      return value / 1000
    }
    return value
  }
}
