import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.scss'
})
export class TenantListComponent {

  constructor(private _router: Router) {}

  tenantData: any;

  onClickAddNewTenant() {
    this._router.navigateByUrl('/tenant-create');
  }

}
