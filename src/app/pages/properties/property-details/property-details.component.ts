import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';
import { SharedDataService } from '../../../utils/services/shared-data.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss',
})
export class PropertyDetailsComponent {
  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private pbCrudService: PbCrudService, 
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit() {
    this.aRoute.paramMap.subscribe((params) => {
      let id: string = params.get('id') ?? '';
      if (id) {
        this.pbCrudService
          .getPropertyById(id)
          .then((data) => {
            console.log('Property data:', data);
            this.propertyData = data
          })
          .catch((err) => console.log('Error', err));
      }
      // console.log('Complete row data:', params.get('created_by'))
      // Use the id to fetch property details
    });
  }

  propertyData: any;

  /*  getPropertyData(propId: string) {
     if (propId) {
       let req = this.pbCrudService
         .getPropertyById(propId)
         .then(data => console.log('Property data:', data))
         .catch((err) =>
           console.log('Error while fetching property details:', err)
         );
     }
   } */

  onBack() {
    // Add your navigation logic here, for example:
    history.back();
  }

  onEdit() {
    // Add your edit logic here, for example:
    // this.router.navigate(['edit'], { relativeTo: this.route });
    alert('Under construction!');
  }

  onDelete() {
    alert('Under construction!');
  }

  underConstructionButton() {
    alert('Under construction!');
  }

  // Unit actions
  onViewUnits() {
    this.underConstructionButton();
  }
  onAddUnit() {
    // this.underConstructionButton(); 
    this.router.navigate(['/unit-create']);
  }

  // Tenant actions
  onViewTenants() {
    this.underConstructionButton();
  }
  onAddTenant() {
    // this.underConstructionButton(); 
    console.log('Property data passed:', this.propertyData); 
    this.sharedDataService.setData(this.propertyData);
    // let navigationExtras: NavigationExtras = { state: { passedData: this.propertyData } };
    this.router.navigate(['/tenant-create']);
  }

  // Tenant actions
  onViewRents() {
    this.underConstructionButton();
  }
  onAddRent() {
    // this.underConstructionButton(); 
    let navigationExtras: NavigationExtras = {};
    this.router.navigate(['/rent-create'], navigationExtras);
  }

  private multiUnitTypes = [
    'multiUnit',
    'multiFamily',
    'commercial',
    'mixedUse',
  ];

  isMultiUnitProperty(): boolean {
    return (
      this.propertyData && this.multiUnitTypes.includes(this.propertyData.type)
    );
  }

  /*   onCollectRent() {
      // this.underConstructionButton(); 
      this.router.navigate(['/rent-create']);
    } */
}
