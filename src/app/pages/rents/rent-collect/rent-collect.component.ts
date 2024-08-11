import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rent-collect',
  templateUrl: './rent-collect.component.html',
  styleUrl: './rent-collect.component.scss'
})
export class RentCollectComponent { 

  rentForm: FormGroup; 

  months = [
    {value: '01', viewValue: 'January'},
    {value: '02', viewValue: 'February'},
    {value: '03', viewValue: 'March'},
    {value: '04', viewValue: 'April'},
    {value: '05', viewValue: 'May'},
    {value: '06', viewValue: 'June'},
    {value: '07', viewValue: 'July'},
    {value: '08', viewValue: 'August'},
    {value: '09', viewValue: 'September'},
    {value: '10', viewValue: 'October'},
    {value: '11', viewValue: 'November'},
    {value: '12', viewValue: 'December'}
  ];

  constructor(private fb: FormBuilder) {
    const currentYear = new Date().getFullYear();
    this.rentForm = this.fb.group({
      tenantId: ['', Validators.required],
      propertyId: ['', Validators.required],
      unitNumber: [''],
      month: ['', Validators.required],
      year: [currentYear, [Validators.required, Validators.min(2000), Validators.max(2100)]],
      rentAmount: [0, [Validators.required, Validators.min(0)]],
      rentDueDate: ['', Validators.required],
      paymentStatus: ['', Validators.required],
      leaseStartDate: ['', Validators.required],
      leaseEndDate: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.rentForm.valid) {
      console.log(this.rentForm.value);
      // Here you would typically send the data to your backend
    }
  }

}
