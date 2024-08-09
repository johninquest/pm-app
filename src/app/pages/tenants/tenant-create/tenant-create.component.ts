import { Component } from '@angular/core';
import { IdbService } from '../../../utils/idb.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES } from '../../../shared/countries.list';
import {
  PAYMENT_FREQUENCY,
  PAYMENT_METHOD,
  PROPERTY_LIST,
} from '../../../shared/dummy.list';

export interface PaymentFrequencyInterface {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-tenant-create',
  templateUrl: './tenant-create.component.html',
  styleUrl: './tenant-create.component.scss',
})
export class TenantCreateComponent {
  constructor(private _idbs: IdbService) {}

  ngOnInit(): void {
    /*  this.getUserData();
    this.getUserDataFromIdb();
    this.tenantForm.patchValue({
      country: 'Cameroon',
    }); */
  }

  userId: any;

  tenantForm = new FormGroup({
    nationalId: new FormControl<string>(''),
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>('', Validators.required),
    /*  dateOfBirth: new FormControl<string>(''), */
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
    /* console.log('UserData', this.tenantForm.value);
    console.log('UserData Type', typeof this.tenantForm.value);
    let userData = JSON.stringify(this.tenantForm.value);
    localStorage.setItem('user_data', userData);
    this._idbs.saveUserData(this.tenantForm.value);
    setTimeout(() => this.tenantForm.disable(), 1000); */
  }
}
