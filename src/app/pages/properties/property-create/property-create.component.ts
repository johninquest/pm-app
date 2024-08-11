import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrl: './property-create.component.scss'
})
export class PropertyCreateComponent { 
  propertyForm: FormGroup; 
  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      address: ['', Validators.required],
      type: ['', Validators.required],
      units: [1, [Validators.required, Validators.min(1)]],
      purchaseDate: ['', Validators.required],
      purchasePrice: [0, [Validators.required, Validators.min(0)]],
      currentValue: [0, [Validators.required, Validators.min(0)]]
    });
  } 
  onSubmit() {
    if (this.propertyForm.valid) {
      console.log(this.propertyForm.value);
      // Here you would typically send the data to your backend
    }
  }

}
