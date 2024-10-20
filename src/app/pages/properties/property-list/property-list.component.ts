import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PbService } from '../../../utils/pb.service';
import { AuthService } from '../../../utils/auth.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent {
  constructor(private _pbService: PbService, private _router: Router, private _fbAuth: AuthService) { }

  propertiesData: any;

  ngOnInit(): void {
    /* const newPropertyId = this.ids.generateCustom(13); */
    /* let pData = this._pbService.getAllPropertyAsList();
    pData.then(data => this.propertiesData = data); */
    this._fbAuth.currentlyLoggedUser().subscribe((res) => {
      let currentUser: string = res?.email ?? ''; 
      if(currentUser) { 
        let pData = this._pbService.getAllPropertyAsList(currentUser);
        pData.then(data => this.propertiesData = data);
      }
    });
  }

  onClickRow(rowData: any) {
    console.log('Row data:', rowData);
    let propertyId: string = rowData['id'];
    console.log('Id of row data:', propertyId);
    this._router.navigate(['/property', propertyId]);
    // alert(`Headed to row: ${JSON.stringify(rowData)}`)
  }

  onClickAddNewProperty() {
    this._router.navigateByUrl('/property-create');
  }
}
