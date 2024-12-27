import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { COUNTRIES } from '../../../shared/lists/countries.list';
import {
  PAYMENT_FREQUENCY,
  PAYMENT_METHOD,
  PROPERTY_LIST,
} from '../../../shared/lists/data.list';
import { PaymentFrequencyInterface } from '../../../utils/data.model';

@Component({
  selector: 'app-tenant-create',
  templateUrl: './tenant-create.component.html',
  styleUrls: ['./tenant-create.component.scss'],
})
export class TenantCreateComponent implements OnInit {
  tenantForm: FormGroup = this.fb.group({
    // Personal Information
    nationalId: ['', Validators.required],
    firstName: [''],
    lastName: ['', Validators.required],

    // Contact Information
    street: [''],
    postCode: [''],
    city: [''],
    country: [''], 
    phone: [''],

    // Rental Information
    propertyId: [''], 
    unitId: [''],
    leaseStartDate: [''],
    rentAmount: ['', [Validators.required, Validators.min(1000)]],
    paymentMethod: [''],
    paymentFrequency: [12]
  });

  countryList: string[] = COUNTRIES;
  propertyList: string[] = PROPERTY_LIST;
  paymentMethodList: string[] = PAYMENT_METHOD;
  paymentFrequencyList: PaymentFrequencyInterface[] = PAYMENT_FREQUENCY;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.tenantForm.valid) {
      console.log('Form data:', this.tenantForm.value);
      this.router.navigateByUrl('/tenant-info');
    } else {
      this.markFormGroupTouched(this.tenantForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}