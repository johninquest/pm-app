import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
/* import { COUNTRIES } from '../../../shared/lists/countries.list'; */
import {
  PAYMENT_FREQUENCY,
  PAYMENT_METHOD,
  PROPERTY_LIST,
} from '../../../shared/lists/data.list';
// import { PAYMENT_METHOD } from '../../../shared/lists/payment-methods.list';
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
    leaseStartDate: ['', Validators.required],
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
  ) {}

  ngOnInit(): void {
    this.pbAuth.getCurrentUser().subscribe((user) => {
      // console.log('Current user at tenant create:', user?.email);
      this.currentUser = user?.email;
      this.fetchRelatedProperties(this.currentUser);
    });
    this.passedPropertyData = this.sharedDataService.getData();
    /* console.log(
      'Retrieved property data from shared service:',
      this.passedPropertyData
    ); */

    // Only set the property name if it exists
    if (this.passedPropertyData?.name) {
      this.tenantForm.patchValue({
        propertyName: this.passedPropertyData.name,
      });
    }

    // If unit ID is not required, remove the validator
    if (!this.isUnitIdRequired()) {
      this.tenantForm.get('unitId')?.clearValidators();
      this.tenantForm.get('unitId')?.updateValueAndValidity();
    }
  }

  fetchRelatedProperties(userId: string) {
    if (!userId?.trim()) {
      console.error('Invalid user ID');
      return;
    }

    this.pbCrud
      .getAllPropertyAsList(userId)
      .then((data) => {
        this.propertiesData = data || [];
      })
      .catch((err) => {
        console.error('Failed to fetch properties:', err);
        this.propertiesData = [];
      });
  }

  // Add this method to TenantCreateComponent class
  isUnitIdRequired(): boolean {
    const requiredTypes = ['multiUnit', 'multiFamily', 'mixedUse'];
    return requiredTypes.includes(this.passedPropertyData?.type);
  }

  onSubmit(): void {
    if (this.tenantForm.valid && this.passedPropertyData?.id) {
      console.log('Tenant form data:', this.tenantForm.value);
      const formValue = this.tenantForm.value;

      const tenantPayload = {
        national_id_number: formValue.nationalIdNumber,
        first_name: formValue.firstName,
        last_name: formValue.lastName,
        address: JSON.stringify({
          street: formValue.street ?? '',
          postCode: formValue.postCode ?? '',
          city: formValue.city ?? '',
          country: formValue.country ?? '',
        }),
        property_id: this.passedPropertyData?.id,
        property_name: this.passedPropertyData?.name,
        unit_id: formValue.unitId,
        lease_start_date: formValue.leaseStartDate,
        /* lease_end_date: formValue.leaseEndDate, */
        rent_amount: formValue.rentAmount,
        payment_frequency: formValue.paymentFrequency,
        payment_method: formValue.paymentMethod,
        created_by: this.currentUser,
      };

      let _saveRequest = this.pbCrud.createTenant(tenantPayload);
      _saveRequest
        .then((res) => {
          console.log('Saved data:', res);
          this.router.navigateByUrl('/tenants');
        })
        .catch((err) => {
          console.log('Error:', err);
          alert(
            'There was an issue. You must be logged in to execute this operation'
          );
        });
    } else {
      this.markFormGroupTouched(this.tenantForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
