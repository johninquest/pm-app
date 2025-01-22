import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';
import { PbAuthService } from '../../../utils/pocketbase/pb-auth.service';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.scss'
})
export class TenantListComponent {

  constructor(private _router: Router, private pbAuth: PbAuthService, private pbCrud: PbCrudService) {}

  currentUser: string = '';
  tenantsData: any; 

  ngOnInit() {
    this.pbAuth.getCurrentUser().subscribe((res) => {
      this.currentUser = res?.email;
      console.log('Current user on tenant list page:', this.currentUser);
      // this.currentUserUid = res?.uid;
    });
    // Fetch tenants data
    this.pbCrud.getAllRecordsAsList('tenants', {sort: '-created', filter: `created_by = "${this.currentUser}"`, expand: 'property'}).then((tenants) => {
      console.log('Fetched tenants data:', tenants);
      this.tenantsData = tenants;
    });
  }

  onClickAddNewTenant() {
    this._router.navigateByUrl('/tenant-create');
  } 

/*   onClickRow(tenant: any){
    console.log('Tapped: ', tenant);
    alert('Tapped: ' + tenant?.first_name + ' ' + tenant?.last_name);
  }  */

  onClickRow(rowData: any) {
    console.log('Row data:', rowData);
     let tenantId: string = rowData['id'];
     console.log('Id of row data:', tenantId);
     this._router.navigate(['/tenant', tenantId]);
   }

}
