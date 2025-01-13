import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES, COUNTRY_CURRENCY_LIST } from '../../shared/lists/countries.list';
import { USER_ROLES } from '../../shared/lists/role.list';
import { UserRoleInterface } from '../../utils/data.model';
import { PbAuthService } from '../../utils/pocketbase/pb-auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  constructor(
    private _pbAuthService: PbAuthService,
  ) {
    // Subscribe to country changes to update currency
    this.userForm.get('country')?.valueChanges.subscribe(selectedCountry => {
      if (selectedCountry) {
        const currencyData = COUNTRY_CURRENCY_LIST.find(item => item.name === selectedCountry);
        this.userForm.patchValue({
          currency: currencyData?.currency || ''
        }, { emitEvent: false }); // Prevent infinite loop
      }
    });
  }

  currentUser: any;
  allUsersList: any;
  currentAuthUser = this._pbAuthService.getCurrentUserAsync(); 
  countryCurrencyList = COUNTRY_CURRENCY_LIST;

  ngOnInit(): void {
    // this.getUserDataFromIdb();
    this.userForm.disable();
    this.currentAuthUser
      .then((res) => {
        console.log('User response:', res); 
        console.log('Role from response:', res?.['role']);  
        this.currentUser = res?.['email'];
        this.userForm.patchValue({
          userId: res?.['email'],
          userRole: res?.['role'],
          lastName: res?.['lastname'],
          firstName: res?.['firstname'],
          phoneNumber: res?.['phone'],
        });
      })
      .catch((e) => console.log('User error:', e));
  }

  userForm = new FormGroup({
    userId: new FormControl<string>(''),
    userRole: new FormControl<string>(''),
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>(''),
    emailAddress: new FormControl<string>(''),
    /*  dateOfBirth: new FormControl<string>(''), */
    street: new FormControl<string>(''),
    postCode: new FormControl<string>(''),
    city: new FormControl<string>(''),
    country: new FormControl<string>(''), 
    currency: new FormControl<string>({ value: '', disabled: true })
  });

  countryList: string[] = COUNTRIES;
  userRoleList: UserRoleInterface[] = USER_ROLES;

  onClickCancel() {
    history.back();
  }

  async onClickSave() {
   
/*     if (!this.currentAuthUser) {
      console.error('UserId is required');
      alert('UserId is required');
     
      return; // Exit the method early if userId is not present
    }
    let userData = {
      firstname: this.userForm.value.firstName ?? '',
      lastname: this.userForm.value.lastName ?? '',
      phone: this.userForm.value.phoneNumber ?? '',
      email: this.userForm.value.emailAddress ?? '',
      role: this.userForm.value.userRole ?? '',
      auth_id: this.currentUser,
      address: {
        country: this.userForm.value.country ?? '',
        postcode: this.userForm.value.postCode ?? '',
        city: this.userForm.value.city ?? '',
        street: this.userForm.value.street ?? '',
      },
    };
    let _saveRequest = this._pbService.createUser(userData);
    _saveRequest
      .then((res) => console.log('Saved data:', res))
      .catch((err) => console.log('Error:', err)); */
  }

  /*   getAuthUserData() {
    let _req = this._pbService.getSpecificUser();
    
  } */

  onClickEdit() {
    this.userForm.enable();
    this.userForm.get('userId')?.disable();
  }
}
