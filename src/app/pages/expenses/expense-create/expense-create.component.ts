import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EXPENSE_TYPE_LIST } from '../../../shared/dummy.list';

@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrl: './expense-create.component.scss'
})
export class ExpenseCreateComponent {

  expenseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      propertyId: ['', Validators.required],
      expenseDate: [''],
      expenseType: [''],
      description: [''],
      cost: [0, [Validators.required, Validators.min(0)]],
      vendorName: ['']
    });
  }

  expenseList: string[] = EXPENSE_TYPE_LIST;


  onSubmit() {
    if (this.expenseForm.valid) {
      console.log(this.expenseForm.value);
      // Here you would typically send the data to your backend
    }
  }


}
