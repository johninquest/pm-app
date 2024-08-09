import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent {
  constructor(private _router: Router) {} 

  listOfPropertiesData: any;

  onClickAddNewProperty() {
    this._router.navigateByUrl('/property-create'); 
  }
}
