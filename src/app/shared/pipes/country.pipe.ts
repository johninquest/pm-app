import { Pipe, PipeTransform } from '@angular/core';
import { COUNTRY_CURRENCY_LIST } from '../lists/countries.list';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {
  transform(code: string): string {
    const country = COUNTRY_CURRENCY_LIST.find(c => c.code === code);
    return country ? country.name : code;
  }
}