import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PROPERTY_CATEGORY_LIST } from '../../../shared/lists/dummy.list';
import { PropertyCategoryInterface } from '../../../utils/data.model';
import { COUNTRIES } from '../../../shared/lists/countries.list'; 
import { UidService } from '../../../utils/uid.service';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrl: './property-create.component.scss',
})
export class PropertyCreateComponent {
  propertyForm: FormGroup;
  constructor(private fb: FormBuilder, private ids: UidService) {
    this.propertyForm = this.fb.group({
      propertyId: [''],
      type: ['', Validators.required],
      numberOfUnits: [1, [Validators.min(1)]],
      /*       purchaseDate: [''],
            purchasePrice: [0], */
      currentValue: [],
      constructionYear: [''],
      /* Address */
      street: [''],
      city: ['', Validators.required],
      state: [''],
      postCode: [''],
      country: ['', Validators.required],
    });
  }

  isMultiUnitProperty(): boolean {
    const propertyType = this.propertyForm.get('type')?.value;
    return ['multiUnit', 'multiFamily', 'mixedUse'].includes(propertyType);
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      alert('Tapped save property!');
      console.log(this.propertyForm.value);
      // Here you would typically send the data to your backend
    }
  }

  propertyCategoryList: PropertyCategoryInterface[] = PROPERTY_CATEGORY_LIST;
  countryList: string[] = COUNTRIES;

  ngOnInit(): void {
    const newPropertyId = this.ids.generateCustom(13);
    this.propertyForm.patchValue({
      propertyId: newPropertyId,
      // country: 'Cameroon',
    });
  } 
}

/*   isMultiUnitProperty(): boolean {
    let propertyType = this.propertyForm.get('type')?.value; 
    console.log('Property type', this.propertyForm.get('type')?.value);
    if (propertyType && propertyType === 'multiUnit') {
      return true;
    }
    if (propertyType && propertyType === 'multiFamily') {
      return true;
    } else {
      return false;
    }
  }  */
