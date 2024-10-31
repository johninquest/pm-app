import { Pipe, PipeTransform } from '@angular/core';
import { PROPERTY_CATEGORY_LIST } from '../lists/data.list';

@Pipe({
  name: 'propertyType'
})
export class PropertyTypePipe implements PipeTransform {

  transform(value: string): string {
    const category = PROPERTY_CATEGORY_LIST.find(cat => cat.value === value);
    return category ? category.viewValue : value;
  }
}
