import { Component, OnInit } from '@angular/core';
import { PbAuthService } from '../../utils/pocketbase/pb-auth.service';
import { PbCrudService } from '../../utils/pocketbase/pb-crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  totalProperties: number = 0;
  totalTenants: number = 0;
  expensesTotal: number = 0;
  rentsTotal: number = 0;
  currentUser: any;

  constructor(private pbAuth: PbAuthService, private pbCrud: PbCrudService) {}

  ngOnInit(): void {
    this.pbAuth.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      this.loadRecordsCount(); // Move here to ensure currentUser is set
    });
  }

  async loadRecordsCount() {
    const queryParams = { filter: `created_by="${this.currentUser.email}"` };
    this.totalProperties = await this.pbCrud.getAllRecordsAsListSize(
      'properties',
      queryParams
    );
    this.totalTenants = await this.pbCrud.getAllRecordsAsListSize(
      'tenants',
      queryParams
    );

    // Calculate expensesTotal
    const expenses = await this.pbCrud.getAllRecordsAsList(
      'expenses',
      queryParams
    );
    this.expensesTotal = expenses.reduce(
      (total, expense: any) => total + (expense.amount || 0),
      0
    );

    // Calculate rentsTotal
    const rents = await this.pbCrud.getAllRecordsAsList('rents', queryParams);
    this.rentsTotal = rents.reduce(
      (total, rent: any) => total + (rent.amount || 0),
      0
    );
  }

  tappedButton(message: string) {
    alert(`Tapped: ${message}`);
  }
}
