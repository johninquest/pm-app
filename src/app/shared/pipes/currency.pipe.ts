import { Pipe, PipeTransform } from '@angular/core';
import { COUNTRY_CURRENCY_LIST } from '../lists/countries.list';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  transform(countryCode: string): string {
    const country = COUNTRY_CURRENCY_LIST.find(c => c.code === countryCode);
    return country ? country.currency : countryCode;
  }
}