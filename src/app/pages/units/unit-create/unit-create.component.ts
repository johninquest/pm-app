import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit-create',
  templateUrl: './unit-create.component.html',
  styleUrl: './unit-create.component.scss'
})
export class UnitCreateComponent { 

  unitForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.unitForm = this.fb.group({
      unitNumber: ['', Validators.required],
     /*  floorNumber: ['', [Validators.required, Validators.min(0)]], */
      unitSize: ['', [Validators.required, Validators.min(1)]],
      bedrooms: ['', [Validators.required, Validators.min(1)]],
      bathrooms: ['', [Validators.required, Validators.min(1)]], 
      toilets: ['', [Validators.min(0)]],
      hasKitchen: ['yes'],
      hasBalcony: ['no'],
      hasGarden: ['no'],
      hasParking: ['no'],
      isGated: [false],
    });
  }

  onSubmit() {
    if (this.unitForm.valid) {
      console.log('Unit Details:', this.unitForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

}
