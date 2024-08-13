import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-info',
  templateUrl: './tenant-info.component.html',
  styleUrl: './tenant-info.component.scss'
})
export class TenantInfoComponent { 
  constructor(private _router:Router) {}

  tenant = {
    nationalId: 'CM2023456789',
    firstName: 'Etienne',
    lastName: 'Mbarga',
    street: '123 Mile 4',
    postCode: '1234',
    city: 'Limbe',
    country: 'Cameroon',
    property: 'Seaside Apartments',
    rentAmount: '150,000 XAF',
    paymentMethod: 'Mobile Money',
    paymentFrequency: 'Monthly'
  };


  deleteTenant() {
    // Here you would typically open a confirmation dialog 
    alert('Pressed delete tenant!')
    console.log('Delete tenant function called');
    // If confirmed, call your delete service
  }

  collectRent() {
    this._router.navigateByUrl('/rent-collect')
    console.log('Collect rent function called');
  }

}
