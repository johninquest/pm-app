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
    this.pbCrud.getAllTenantsAsList(this.currentUser).then((tenants) => {
      this.tenantsData = tenants;
    });
  }

  onClickAddNewTenant() {
    this._router.navigateByUrl('/tenant-create');
  } 

  onClickRow(tenant: any){
    console.log('Tapped: ', tenant);
    alert('Tapped: ' + tenant?.first_name + ' ' + tenant?.last_name);
  }

}
