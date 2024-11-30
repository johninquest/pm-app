import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EXPENSE_TYPE_LIST, PROPERTY_LIST } from '../../../shared/lists/data.list';
import dayjs from 'dayjs';
import { PbAuthService } from '../../../utils/pocketbase/pb-auth.service';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrl: './expense-create.component.scss'
})
export class ExpenseCreateComponent {

  expenseForm: FormGroup;
  propertiesData: any[] = [];
  expenseList: string[] = EXPENSE_TYPE_LIST;
  currentUser: string = '';
  // propertyList: string[] = PROPERTY_LIST;

  // Getter for property names
  get propertyList(): string[] {
    return this.propertiesData.map(property => property.name);
  }

  constructor(private fb: FormBuilder, private _pbAuth: PbAuthService, private _pbCrud: PbCrudService, private _router: Router) {
    this.expenseForm = this.fb.group({
      // propertyId: ['', Validators.required],
      propertyName: ['', Validators.required],
      expenseDate: [dayjs().format('YYYY-MM-DD')],
      expenseType: [''],
      description: [''],
      amount: [0, [Validators.required, Validators.min(0)]],
      vendorName: ['']
    }); 
    _pbAuth.getCurrentUser().subscribe(user => {
      // console.log('Current user at expense:', user); 
      this.currentUser = user?.email; 
      this.fetchRelatedProperties(this.currentUser);
    })
  } 

  fetchRelatedProperties(userId: string) {
    if(userId) {
      let pData = this._pbCrud.getAllPropertyAsList(userId); 
      pData.then(data => {
        // console.log('Property data', data)
        this.propertiesData = data
      })

    }
  }

  onSubmit() {
    // console.log('Expense data:', this.expenseForm.value);
    if (this.expenseForm.valid && this.currentUser) {
      console.log('Expense data:', this.expenseForm.value);
      // Here you would typically send the data to your backend
      let expensePayload: object = {
        property_name: this.expenseForm.value.propertyName, 
        date_of_expense: this.expenseForm.value.expenseDate, 
        expense_type: this.expenseForm.value.expenseType, 
        description: this.expenseForm.value.description, 
        amount: this.expenseForm.value.amount, 
        vendor: this.expenseForm.value.vendorName, 
        created_by: this.currentUser
      }; 
      let req = this._pbCrud.createExpense(expensePayload);
      req.then(res => {
        console.log('Saved expense successfully', res); 
        this._router.navigateByUrl('expenses');
      }).catch(err => console.log('Error at create expense', err))
    } else {
      console.log('Form is not valid')
    }
  }


}
