import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES } from '../../shared/lists/countries.list';
import { IdbService } from '../../utils/idb.service';
import { USER_ROLES } from '../../shared/lists/role.list';
import { UserRoleInterface } from '../../utils/data.model';
import { PbService } from '../../utils/pb.service';
import { AuthService } from '../../utils/auth.service';
import { PbAuthService } from '../../utils/pocketbase/pb-auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  constructor(
    private _idbService: IdbService,
    private _pbService: PbService,
    private _pbAuthService: PbAuthService,
    private _fbAuthService: AuthService
  ) {}

  currentUser: any;
  allUsersList: any;
  currentAuthUser = this._pbAuthService.getCurrentUserAsync();

  ngOnInit(): void {
    // this.getUserDataFromIdb();
    this.userForm.disable();
    /* this._fbAuthService
      .currentlyLoggedUser()
      .subscribe((res) => {
        this.currentUser = res?.email;
        this.userForm.patchValue({
          userId: res?.email,
        });
        console.log('Current user id:', res?.email) 
        console.log('Current user uid:', res?.uid)
      }); */
    // this.allUsersList = this._pbService.getAllUsersAsList();
    this.currentAuthUser
      .then((res) => {
        console.log('User response:', res);
        this.currentUser = res?.['email'];
        this.userForm.patchValue({
          userId: res?.['email'],
          userRole: res?.['role'],
          lastName: res?.['lastname'],
          firstName: res?.['firstname'],
          phoneNumber: res?.['phone'],
          emailAddress: res?.['email'],
          country: res?.['country'],
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
  });

  countryList: string[] = COUNTRIES;
  userRoleList: UserRoleInterface[] = USER_ROLES;

  onClickCancel() {
    history.back();
  }

  async onClickSave() {
    /* 
    console.log('UserData', this.userForm.value);
    console.log('UserData Type', typeof this.userForm.value); */
    /* let userData = JSON.stringify(this.userForm.value);
    localStorage.setItem('user_data', userData);
    this._idbService.saveUserData(this.userForm.value) */
    // setTimeout(() => this.userForm.disable(), 1000);
    if (!this.currentAuthUser) {
      console.error('UserId is required');
      alert('UserId is required');
      // You can show an error message to the user here
      // For example, using a snackbar or alert
      // this.snackBar.open('User ID is required', 'Close', { duration: 3000 });
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
      .catch((err) => console.log('Error:', err));
  }

  getUserDataFromIdb() {
    this._idbService.fetchUserData().then((data) => {
      if (data) {
        this.userForm.patchValue({
          firstName: data['formData']['firstName'] ?? '',
          lastName: data['formData']['lastName'] ?? '',
          phoneNumber: data['formData']['phoneNumber'] ?? '',
          emailAddress: data['formData']['emailAddress'] ?? '',
          /* dateOfBirth: data['formData']['dateOfBirth'] ?? '', */
          street: data['formData']['street'] ?? '',
          postCode: data['formData']['postCode'] ?? '',
          city: data['formData']['city'] ?? '',
          country: data['formData']['country'] ?? '',
        });
      }
    });
  }

  /*   getAuthUserData() {
    let _req = this._pbService.getSpecificUser();
    
  } */

  onClickEdit() {
    this.userForm.enable();
    this.userForm.get('userId')?.disable();
  }
}
