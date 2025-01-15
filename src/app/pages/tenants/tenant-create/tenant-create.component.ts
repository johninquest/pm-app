import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
/* import { COUNTRIES } from '../../../shared/lists/countries.list'; */
import {
  PAYMENT_FREQUENCY,
  PAYMENT_METHOD,
  PROPERTY_LIST,
} from '../../../shared/lists/data.list';
import { PaymentFrequencyInterface } from '../../../utils/data.model';
import { PbAuthService } from '../../../utils/pocketbase/pb-auth.service';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';
import { SharedDataService } from '../../../utils/services/shared-data.service';

@Component({
  selector: 'app-tenant-create',
  templateUrl: './tenant-create.component.html',
  styleUrls: ['./tenant-create.component.scss'],
})
export class TenantCreateComponent implements OnInit {
  tenantForm: FormGroup = this.fb.group({
    // Personal Information
    nationalIdNumber: ['', Validators.required],
    firstName: [''],
    lastName: ['', Validators.required],

    // Contact Information
    street: [''],
    postCode: [''],
    city: [''],
    country: [''],
    phone: [''],
    email: [''],

    // Rental Information
    propertyName: [''],
    unitId: [''],
    leaseStartDate: [''],
    rentAmount: ['', [Validators.required, Validators.min(1000)]],
    paymentMethod: [''],
    paymentFrequency: [12],
  });

  /*  countryList: string[] = COUNTRIES; */
  unitList: string[] = PROPERTY_LIST;
  paymentMethodList: string[] = PAYMENT_METHOD;
  paymentFrequencyList: PaymentFrequencyInterface[] = PAYMENT_FREQUENCY;
  propertiesData: any[] = [];
  currentUser: string = '';
  passedPropertyData: any;

  // Getter for property names
  get propertyList(): string[] {
    return this.propertiesData.map((property) => property.name);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pbAuth: PbAuthService,
    private pbCrud: PbCrudService, 
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.pbAuth.getCurrentUser().subscribe((user) => {
      // console.log('Current user at expense:', user);
      this.currentUser = user?.email;
      this.fetchRelatedProperties(this.currentUser);
    }); 
    this.passedPropertyData = this.sharedDataService.getData();
    console.log('Retrieved property data from shared service:', this.passedPropertyData); 
    this.tenantForm.patchValue({propertyName: this.passedPropertyData?.name});
  }

  fetchRelatedProperties(userId: string) {
    if (userId) {
      let pData = this.pbCrud.getAllPropertyAsList(userId);
      pData.then((data) => {
        this.propertiesData = data;
      });
    }
  }

  onSubmit(): void {
    if (this.tenantForm.valid) {
      console.log('Form data:', this.tenantForm.value);
      this.router.navigateByUrl('/tenant-info');
    } else {
      this.markFormGroupTouched(this.tenantForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
