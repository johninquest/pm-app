import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';

@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrl: './rent-details.component.scss'
})
export class RentDetailsComponent { 
  constructor(private aRoute: ActivatedRoute, private router: Router, private pbCrud: PbCrudService) {}  

  rentData: any; 

  ngOnInit() {
    this.aRoute.paramMap.subscribe(params => {
      let id: string = params.get('id') ?? '';
      if (id) {
        console.log('Rent Id:', id)
        // this.pbCrudService.getExpenseById(id).then(data => this.tenantData = data).catch(err => console.log('Error', err)) 
        this.pbCrud.getRecordById('rents', id, {expand: 'property, tenant'})
        .then(data => {
          console.log('Fetched rent data:', data);
          this.rentData = data;
        })
        .catch(err => console.log('Error', err));
      }
      // console.log('Complete row data:', params.get('created_by'))
      // Use the id to fetch property details
    });
  }

  onBack(): void {
    this.router.navigate(['/rents']);
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
