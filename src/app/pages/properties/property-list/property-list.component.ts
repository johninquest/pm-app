import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PbService } from '../../../utils/pb.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent {
  constructor(private _pbService: PbService, private _router: Router) {} 

  propertiesData: any; 

  ngOnInit(): void {
    /* const newPropertyId = this.ids.generateCustom(13); */
    let pData = this._pbService.getAllPropertyAsList();
    pData.then(data => this.propertiesData = data);
    // console.log('Data:', this._pbService.getAllPropertyAsList())
  }

  onClickAddNewProperty() {
    this._router.navigateByUrl('/property-create'); 
  }
}
