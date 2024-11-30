import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { PbService } from '../../../utils/pb.service';
// import { AuthService } from '../../../utils/auth.service';
import { PbAuthService } from '../../../utils/pocketbase/pb-auth.service';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent {
  constructor(
    // private _pbService: PbService,
    private _router: Router,
    private _pbAuthService: PbAuthService, 
    private _pbCrudService: PbCrudService
  ) {}

  propertiesData: any;
  currentUser: string = '';

  ngOnInit(): void {
    this._pbAuthService.getCurrentUser().subscribe((user) => {
      /* console.log('User:', user);
      console.log('User email:', user?.['email']); */
      this.currentUser = user?.['email'];
      this._pbCrudService.getAllPropertyAsList(this.currentUser).then(data => this.propertiesData = data).catch(err => console.log('Error fetching properties list:', err))
    });
  }

  onClickRow(rowData: any) {
    console.log('Row data:', rowData);
    let propertyId: string = rowData['id'];
    console.log('Id of row data:', propertyId);
    this._router.navigate(['/property', propertyId]);
  }

  onClickAddNewProperty() {
    this._router.navigateByUrl('/property-create');
  }
}
