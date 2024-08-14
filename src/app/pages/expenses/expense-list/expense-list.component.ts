import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent {
  constructor(private _router: Router) { }

  expenseData: any;

  onClickAddNewExpense() {
    this._router.navigateByUrl('/expense-create');
  }

}
