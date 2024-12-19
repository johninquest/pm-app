import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PbAuthService } from '../../../utils/pocketbase/pb-auth.service';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
})
export class ExpenseListComponent {
  currentUser: string = '';
  expensesData: any;

  constructor(
    private _router: Router,
    private _pbAuth: PbAuthService,
    private _pbCrud: PbCrudService
  ) {}

  ngOnInit(): void {
    this._pbAuth.getCurrentUser().subscribe((user) => {
      /* console.log('User:', user);
      console.log('User email:', user?.['email']); */
      this.currentUser = user?.['email'];
      this._pbCrud
        .getAllExpensesAsList(this.currentUser)
        .then((data) => {
          console.log('Expenses data:', data)
          this.expensesData = data;
        })
        .catch((err) => console.log('Error fetching list of expenses:', err));
    });
  }

  fetchExpensesData() {} 
  onClickRow(rowData: any) {
   console.log('Row data:', rowData);
    let expenseId: string = rowData['id'];
    console.log('Id of row data:', expenseId);
    this._router.navigate(['/expense', expenseId]);
  }

  onClickAddNewExpense() {
    this._router.navigateByUrl('/expense-create');
  }
}
