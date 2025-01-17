import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRY_CURRENCY_LIST } from '../../shared/lists/countries.list';
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
    this.userForm.get('country')?.valueChanges.subscribe(selectedCountryCode => {
      if (selectedCountryCode) {
        const currencyData = COUNTRY_CURRENCY_LIST.find(item => item.code === selectedCountryCode);
        this.userForm.patchValue({
          currency: currencyData?.currency || ''
        }, { emitEvent: false }); // Prevent infinite loop
      }
    });
  }

  currentUser: any;
  allUsersList: any;
  currentAuthUser = this._pbAuthService.getCurrentUserAsync(); 
  countryList = COUNTRY_CURRENCY_LIST;

  ngOnInit(): void {
    this.userForm.disable();
    this.currentAuthUser
      .then((res) => {
        /* console.log('User auth data:', res); 
        console.log('User role from response:', res?.['role']);  
        console.log('Username from response:', res?.['username']);  */
        this.currentUser = res?.['username'];
        this.userForm.patchValue({
          userId: res?.['username'], 
          emailAddress: res?.['email'],
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
    street: new FormControl<string>(''),
    postCode: new FormControl<string>(''),
    city: new FormControl<string>(''),
    country: new FormControl<string>(''), // This will store the country code
    currency: new FormControl<string>({ value: '', disabled: true })
  });

  userRoleList: UserRoleInterface[] = USER_ROLES;

  getCountryName(code: string): string {
    const country = COUNTRY_CURRENCY_LIST.find(c => c.code === code);
    return country ? country.name : code;
  }

  onClickCancel() {
    history.back();
  }

  onClickEdit() {
    this.userForm.enable();
    this.userForm.get('userId')?.disable();
    this.userForm.get('currency')?.disable(); // Keep currency disabled as it's derived
  }

  async onClickSave() {
    // Your save logic here
  }
}