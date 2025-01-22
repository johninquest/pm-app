import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName',
})
export class MonthNamePipe implements PipeTransform {
  private months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  transform(value: number): string {
    // Subtract 1 since arrays are 0-based but months are 1-based
    if (value >= 1 && value <= 12) {
      return this.months[value - 1];
    }
    return '';
  }
}
