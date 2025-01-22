import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrl: './tenant-details.component.scss'
})
export class TenantDetailsComponent { 
   constructor(private aRoute: ActivatedRoute, private router: Router, private pbCrudService: PbCrudService) { } 

   ngOnInit() {
    this.aRoute.paramMap.subscribe(params => {
      let id: string = params.get('id') ?? '';
      if (id) {
        console.log('Tenant Id:', id)
        // this.pbCrudService.getExpenseById(id).then(data => this.tenantData = data).catch(err => console.log('Error', err)) 
        this.pbCrudService.getRecordById('tenants', id, {expand: 'property'})
        .then(data => {
          console.log('Fetched tenant data:', data);
          this.tenantData = data;
        })
        .catch(err => console.log('Error', err));
      }
      // console.log('Complete row data:', params.get('created_by'))
      // Use the id to fetch property details
    });
  }

  tenantData: any; 

  onBack(): void {
    this.router.navigate(['/tenants']);
  }

  onEdit(): void {
    // this.router.navigate(['/tenants/edit', this.tenantId]); 
    alert('Under construction!')
  }

  onDelete(): void {
    /* if (confirm('Are you sure you want to delete this tenant?')) {
      this.pbCrudService.deleteTenant(this.tenantId)
        .then(() => {
          this.router.navigate(['/tenants']);
        })
        .catch(err => {
          console.error('Error deleting tenant:', err);
          alert('Failed to delete tenant');
        });
    } */
    alert('Under construction!');
  }

}
