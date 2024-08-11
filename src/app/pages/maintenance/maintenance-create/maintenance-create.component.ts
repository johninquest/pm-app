import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-maintenance-create',
  templateUrl: './maintenance-create.component.html',
  styleUrl: './maintenance-create.component.scss'
})
export class MaintenanceCreateComponent {

  maintenanceForm: FormGroup;

  constructor(private fb: FormBuilder) {this.maintenanceForm = this.fb.group({
    propertyId: ['', Validators.required],
    maintenanceDate: ['', Validators.required],
    description: ['', Validators.required],
    cost: [0, [Validators.required, Validators.min(0)]],
    vendorName: ['', Validators.required]
  });}


  onSubmit() {
    if (this.maintenanceForm.valid) {
      console.log(this.maintenanceForm.value);
      // Here you would typically send the data to your backend
    }
  }

}
