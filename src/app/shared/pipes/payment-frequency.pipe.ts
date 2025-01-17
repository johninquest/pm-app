import { Pipe, PipeTransform } from '@angular/core';
import { PAYMENT_FREQUENCY } from '../lists/payments.list';

@Pipe({
  name: 'paymentFrequency',
})
export class PaymentFrequencyPipe implements PipeTransform {
  /*   transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }  */

  transform(value: number): string {
    const paymentFreq = PAYMENT_FREQUENCY.find((pf) => pf.value === value);
    return paymentFreq ? paymentFreq.viewValue : '';
  }
}
