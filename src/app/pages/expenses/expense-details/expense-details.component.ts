import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrl: './expense-details.component.scss',
})
export class ExpenseDetailsComponent {
  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private pbCrud: PbCrudService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.aRoute.paramMap.subscribe((params) => {
      let id: string = params.get('id') ?? '';
      if (id) {
        this.pbCrud
          .getExpenseById(id)
          .then((data) => {
            // console.log('Fetched expense data:', data);
            this.expenseData = data;
          })
          .catch((err) => console.log('Error', err));
      }
      // console.log('Complete row data:', params.get('created_by'))
      // Use the id to fetch property details
    });
  }

  expenseData: any;

  getPropertyData(propId: string) {
    if (propId) {
      let req = this.pbCrud
        .getPropertyById(propId)
        .then()
        .catch((err) =>
          console.log('Error while fetching property details:', err)
        );
    }
  }

  onBack() {
    // Add your navigation logic here, for example:
    history.back();
  }

  onEdit() {
    // Add your edit logic here, for example:
    // this.router.navigate(['edit'], { relativeTo: this.route });
    alert('Under construction!');
  }

  /*   onDelete() {
    alert('Under construction!')
  } */

  onDelete() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete confirmation',
        message: 'Are you sure you want to delete',
        item: `this ${this.expenseData['expense_type']} expense`, // or 'this rent record', etc.
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked Delete
        // Implement your delete logic here
        // console.log('Proceeding with delete...'); 
        let collectionName = 'expenses';
        let recordId = this.expenseData['id'];
        this.pbCrud.deleteRecord(collectionName, recordId)
        .then(() => {
          this.router.navigate(['/expenses']);
        })
        .catch(err => {
          // console.error('Error deleting tenant:', err);
          alert('Failed to delete expense');
        });
      }
    });
  }

  underConstructionButton() {
    alert('Under construction!');
  }
}
