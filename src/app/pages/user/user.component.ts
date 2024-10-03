import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES } from '../../shared/lists/countries.list';
import { IdbService } from '../../utils/idb.service';
import { USER_ROLES } from '../../shared/lists/role.list';
import { UserRoleInterface } from '../../utils/data.model'; 
import { PbService } from '../../utils/pb.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  constructor(private _idbs: IdbService, private pbService: PbService) { }

  ngOnInit(): void {
    this.getUserDataFromIdb();
    this.userForm.disable();
    this.userForm.patchValue({
      country: 'Cameroon',
    }); 
    this.pbService.socialAuth();
    this.allUsersList = this.pbService.getAllUsersAsList();
  }

  userId: any;
  allUsersList: any;

  userForm = new FormGroup({
    userId: new FormControl<string>('', Validators.required),
    userRole: new FormControl<string>(''),
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''), 
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

  onClickSave() {
    // alert('Tapped save button!');
    console.log('UserData', this.userForm.value);
    console.log('UserData Type', typeof this.userForm.value);
    // let userData = this.userForm.value;
    let userData = JSON.stringify(this.userForm.value);
    localStorage.setItem('user_data', userData);
    this._idbs.saveUserData(this.userForm.value)
    setTimeout(() => this.userForm.disable(), 1000);
  }

  /*   getUserData() {
      let storedData = localStorage.getItem('user_data');
      if (storedData) {
        // console.log('Stored data:', storedData);
        let parsedData = JSON.parse(storedData);
        this.userForm.patchValue({
          firstName: parsedData['firstName'],
          lastName: parsedData['lastName'],
          dateOfBirth: parsedData['dateOfBirth'],
          street: parsedData['street'],
          postCode: parsedData['postCode'],
          city: parsedData['city'],
          country: parsedData['country'],
        });
      } else {
        console.log('No user data stored!');
      }
    } */

  getUserDataFromIdb() {
    this._idbs.fetchUserData().then((data) => {
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
    })
  }

  onClickEdit() {
    this.userForm.enable();
  }
}
