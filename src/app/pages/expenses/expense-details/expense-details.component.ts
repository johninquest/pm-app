import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrl: './expense-details.component.scss'
})
export class ExpenseDetailsComponent { 
    constructor(private aRoute: ActivatedRoute, private router: Router, private pbCrudService: PbCrudService) { }

  ngOnInit() {
    this.aRoute.paramMap.subscribe(params => {
      let id: string = params.get('id') ?? '';
      if (id) {
        this.pbCrudService.getExpenseById(id).then(data => this.expenseData = data).catch(err => console.log('Error', err))
      }
      // console.log('Complete row data:', params.get('created_by'))
      // Use the id to fetch property details
    });
  }

  expenseData: any;

  getPropertyData(propId: string) {
    if (propId) {
      let req = this.pbCrudService.getPropertyById(propId).then().catch(err => console.log('Error while fetching property details:', err))
    }

  }

  onBack() {
    // Add your navigation logic here, for example:
    history.back();
  }

  onEdit() {
    // Add your edit logic here, for example:
    // this.router.navigate(['edit'], { relativeTo: this.route }); 
    alert('Under construction!')
  }

  onDelete() {
    alert('Under construction!')
  }

  underConstructionButton() {
    alert('Under construction!')
  }
}
