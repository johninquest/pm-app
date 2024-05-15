import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES } from '../../shared/countries.list';
// import { IdbService } from '../../utils/idb.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent  { 
  // constructor(private _idb: IdbService) {}

  ngOnInit(): void { 
    this.getUserData();
    this.userForm.disable();
    this.userForm.patchValue({
      country: 'Germany'
    })
  }

  userId: any;

  userForm = new FormGroup({
    userId: new FormControl<string>('', Validators.required),
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    dateOfBirth: new FormControl<string>(''),
    street: new FormControl<string>(''),
    postCode: new FormControl<string>(''),
    city: new FormControl<string>(''),
    country: new FormControl<string>(''),
  });

  countryList: string[] = COUNTRIES;

  onClickCancel() {
    history.back()
  }

  onClickSave() {
    alert('Tapped save button!');
    console.log('UserData', this.userForm.value); 
    console.log('UserData Type', typeof this.userForm.value);  
    // let userData = this.userForm.value;
    let userData = JSON.stringify(this.userForm.value);
    localStorage.setItem('user_data', userData);
    /* this._idb.addData(userData).then(res => console.log('addResponse:', res)) */
  } 

  getUserData() {
    let storedData = localStorage.getItem('user_data'); 
    if(storedData) {
      console.log('Stored data:', storedData)
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
    }else { 
      console.log('No user data stored!')

    }
  }

  onClickEdit() {
    this.userForm.enable()
  }

}
