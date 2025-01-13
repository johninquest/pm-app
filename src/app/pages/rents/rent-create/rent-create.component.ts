import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PbAuthService } from '../../../utils/pocketbase/pb-auth.service';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';

@Component({
  selector: 'app-rent-create',
  templateUrl: './rent-create.component.html',
  styleUrl: './rent-create.component.scss',
})
export class RentCreateComponent {
  rentForm: FormGroup;
  propertiesData: any[] = [];
  currentUser: string = '';

  // Getter for property names
  get propertyList(): string[] {
    return this.propertiesData.map((property) => property.name);
  }

  months = [
    { value: 1, viewValue: 'January' },
    { value: 2, viewValue: 'February' },
    { value: 3, viewValue: 'March' },
    { value: 4, viewValue: 'April' },
    { value: 5, viewValue: 'May' },
    { value: 6, viewValue: 'June' },
    { value: 7, viewValue: 'July' },
    { value: 8, viewValue: 'August' },
    { value: 9, viewValue: 'September' },
    { value: 10, viewValue: 'October' },
    { value: 11, viewValue: 'November' },
    { value: 12, viewValue: 'December' },
  ];

  constructor(private fb: FormBuilder, private _pbAuth: PbAuthService, private _pbCrud: PbCrudService) {
    const currentYear = new Date().getFullYear();
    this.rentForm = this.fb.group({
      tenantId: ['', Validators.required],
      propertyId: ['', Validators.required],
      unitNumber: [''],
      month: ['', Validators.required],
      year: [
        currentYear,
        [Validators.required, Validators.min(2000), Validators.max(2100)],
      ],
      rentAmount: [0, [Validators.required, Validators.min(0)]],
      rentDueDate: ['', Validators.required],
      paymentStatus: ['', Validators.required],
      leaseStartDate: ['', Validators.required],
      leaseEndDate: ['', Validators.required],
    });
    _pbAuth.getCurrentUser().subscribe(user => {
      // console.log('Current user at expense:', user); 
      this.currentUser = user?.email; 
      this.fetchRelatedProperties(this.currentUser);
    })
  }

  fetchRelatedProperties(userId: string) {
    if(userId) {
      let pData = this._pbCrud.getAllPropertyAsList(userId); 
      pData.then(data => {
        this.propertiesData = data
      })

    }
  }

  onSubmit() {
    if (this.rentForm.valid) {
      console.log(this.rentForm.value);
      // Here you would typically send the data to your backend
    }
  }
}
