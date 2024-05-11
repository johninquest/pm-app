import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES } from '../../shared/countries.list';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  ngOnInit(): void {
    this.userForm.disable()
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
    country: new FormControl<string>(''),
  });

  countryList: string[] = COUNTRIES;

  onClickCancel() {
    history.back()
  }

  onClickSave() {
    alert('Tapped save button!')
  }

  onClickEdit() {
    this.userForm.enable()
  }

}
