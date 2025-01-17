import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';
import { PbAuthService } from '../../../utils/pocketbase/pb-auth.service';

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.scss'] // Fixed the property name
})
export class RentListComponent implements OnInit {
  currentUser: string = '';
  collectedRentsData: any;

  constructor(
    private router: Router,
    private pbAuth: PbAuthService,
    private pbCrud: PbCrudService
  ) {}

  ngOnInit(): void {
    // Fetch the current user
    this.pbAuth.getCurrentUser().subscribe((user) => {
      this.currentUser = user?.email || '';
      console.log('Current user on rents list page:', this.currentUser);

      // Fetch collected rents data after confirming the current user
      this.fetchCollectedRents();
    });
  }

  // Navigate to rent creation page
  onClickAddNewRent(): void {
    this.router.navigateByUrl('/rent-create');
  }

  // Fetch collected rents data
  private fetchCollectedRents(): void {
    this.pbCrud
      .getAllRecordsAsList('incomes', {
        sort: '-created',
        filter: `created_by = "${this.currentUser}"`,
      })
      .then((rents) => {
        this.collectedRentsData = rents;
      })
      .catch((error) => {
        console.error('Error fetching collected rents data:', error);
      });
  }
}
