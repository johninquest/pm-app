import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private pbAuthService: PbAuthService, 
    private pbCrudService: PbCrudService
  ) {}

  propertiesData: any;
  currentUser: string = '';

  ngOnInit(): void { 
    window.scrollTo(0, 0); // Scroll to top of page
    this.pbAuthService.getCurrentUser().subscribe((user) => {
      /* console.log('User:', user);
      console.log('User email:', user?.['email']); */
      this.currentUser = user?.['email'];
      this.pbCrudService.getAllRecordsAsList('properties', {filter: `created_by = "${this.currentUser}"`}).then(data => this.propertiesData = data).catch(err => console.log('Error fetching properties list:', err))
    });
  }

  onClickRow(rowData: any) {
    // console.log('Row data:', rowData);
    let propertyId: string = rowData['id'];
    // console.log('Id of row data:', propertyId);
    this.router.navigate(['/property', propertyId]);
  }

  onClickAddNewProperty() {
    this.router.navigateByUrl('/property-create');
  }
}
