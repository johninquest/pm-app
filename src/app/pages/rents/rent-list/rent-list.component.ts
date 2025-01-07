import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrl: './rent-list.component.scss'
})
export class RentListComponent { 
  constructor(private _router: Router){}

  onClickAddNewRent(){
    this._router.navigateByUrl('/rent-create');
  } 
}
