import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PROPERTY_CATEGORY_LIST } from '../../../shared/dummy.list';
import { PropertyCategoryInterface } from '../../../utils/data.model';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrl: './property-create.component.scss',
})
export class PropertyCreateComponent {
  propertyForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      propertyId: [''],
      type: ['', Validators.required],
      /*  numberOfUnits: [1, [Validators.required, Validators.min(1)]], */
      purchaseDate: [''],
      purchasePrice: [0],
      currentValue: [],
      constructionYear: [''],
      propertyAddress: [''],
    });
  }
  onSubmit() {
    if (this.propertyForm.valid) {
      alert('Tapped save property!');
      console.log(this.propertyForm.value);
      // Here you would typically send the data to your backend
    }
  }

  propertyCategoryList: PropertyCategoryInterface[] = PROPERTY_CATEGORY_LIST;
}
