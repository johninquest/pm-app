import { Component, OnInit } from '@angular/core';
import { IdbService } from '../../../utils/idb.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { COUNTRIES } from '../../../shared/lists/countries.list';
import {
  PAYMENT_FREQUENCY,
  PAYMENT_METHOD,
  PROPERTY_LIST,
} from '../../../shared/lists/dummy.list';
import { PaymentFrequencyInterface } from '../../../utils/data.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tenant-create',
  templateUrl: './tenant-create.component.html',
  styleUrl: './tenant-create.component.scss',
})
export class TenantCreateComponent implements OnInit {

  /*   tenantForm = new FormGroup({
      nationalId: new FormControl<string>(''),
      firstName: new FormControl<string>(''),
      lastName: new FormControl<string>('', Validators.required),
      street: new FormControl<string>(''),
      postCode: new FormControl<string>(''),
      city: new FormControl<string>(''),
      country: new FormControl<string>(''),
      propertyId: new FormControl<string>(''),
      rentAmount: new FormControl<string>(''),
      paymentMethod: new FormControl(<string>''),
      paymentFrequency: new FormControl<string>(''),
    });
  
    countryList: string[] = COUNTRIES;
    propertyList: string[] = PROPERTY_LIST;
    paymentMethodList: string[] = PAYMENT_METHOD;
    paymentFrequencyList: PaymentFrequencyInterface[] = PAYMENT_FREQUENCY;
  
    onClickCancel() {
      history.back();
    }
  
    onClickSave() {
      alert('Still under construction!');
    }
  
   */

  personalInfoForm: FormGroup;
  addressForm: FormGroup;
  rentalInfoForm: FormGroup;
  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';

  countryList: string[] = COUNTRIES;
  propertyList: string[] = PROPERTY_LIST;
  paymentMethodList: string[] = PAYMENT_METHOD;
  paymentFrequencyList: PaymentFrequencyInterface[] = PAYMENT_FREQUENCY;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver, private _router: Router
  ) {
    this.personalInfoForm = this.formBuilder.group({
      nationalId: ['', Validators.required],
      firstName: [''],
      lastName: ['', Validators.required]
    });

    this.addressForm = this.formBuilder.group({
      street: [''],
      postCode: [''],
      city: [''],
      country: ['']
    });

    this.rentalInfoForm = this.formBuilder.group({
      propertyId: [''],
      leaseStartDate: [''],
      perYearRentAmount: ['', [Validators.required, Validators.min(1000)]],
      paymentMethod: [''],
      paymentFrequency: [12]
    });
  }

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.stepperOrientation = result.matches ? 'vertical' : 'horizontal';
      }); 
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    /*   if (this.personalInfoForm.valid && this.addressForm.valid && this.rentalInfoForm.valid) {
        const formData = {
          ...this.personalInfoForm.value,
          ...this.addressForm.value,
          ...this.rentalInfoForm.value
        };
        console.log(formData);
        // Here you would typically send the data to your backend
      } */
    this._router.navigateByUrl('/tenant-info')
  }

}
