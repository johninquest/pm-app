import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

  transform(value: string): string {
    const statusMap: { [key: string]: string } = {
      'fullyPaid': 'Fully Paid',
      'partiallyPaid': 'Partially Paid',
      'unpaid': 'Unpaid'
    };

    return statusMap[value] || value;
  }

}
