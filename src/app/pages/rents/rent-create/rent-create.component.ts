import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PbAuthService } from '../../../utils/pocketbase/pb-auth.service';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';
import { PropertyListService } from '../../../utils/services/property-list.service';
import { SharedDataService } from '../../../utils/services/shared-data.service';

@Component({
  selector: 'app-rent-create',
  templateUrl: './rent-create.component.html',
  styleUrl: './rent-create.component.scss',
})
export class RentCreateComponent {
  rentForm!: FormGroup;
  propertiesData: any[] = [];
  currentUser: string = '';
  passedPropertyData: any;
  propertyId: string = '';
  tenantId: string = '';

  // Getter for property names
  get propertyList(): string[] {
    return this.propertiesData.map((property) => property.name);
  }

  months = [
    { value: 1, viewValue: 'January' },
    { value: 2, viewValue: 'February' },
    { value: 3, viewValue: 'March' },
    { value: 4, viewValue: 'April' },
    { value: 5, viewValue: 'May' },
    { value: 6, viewValue: 'June' },
    { value: 7, viewValue: 'July' },
    { value: 8, viewValue: 'August' },
    { value: 9, viewValue: 'September' },
    { value: 10, viewValue: 'October' },
    { value: 11, viewValue: 'November' },
    { value: 12, viewValue: 'December' },
  ];

  constructor(
    private fb: FormBuilder,
    private pbAuth: PbAuthService,
    private pbCrud: PbCrudService,
    private propertyListService: PropertyListService,
    private sharedDataService: SharedDataService
  ) {
    this.initializeForm();
    this.initializeCurrentUser();
  }

  ngOnInit(): void {
    // Fetch data from the shared service
    this.passedPropertyData = this.sharedDataService.getData();
    // console.log('Retrieved property data from shared service:', this.passedPropertyData);

    // Pre-fill form with shared data if available
    if (this.passedPropertyData) {
      console.log('Passed property data:', this.passedPropertyData);
      this.rentForm.patchValue({ propertyName: this.passedPropertyData?.name });
      this.propertyId = this.passedPropertyData?.id; 
      if (this.propertyId) {
        this.fetchTenant(this.passedPropertyData?.id);
      }
    }

    // If unit ID is not required, remove the validator
    if (!this.isUnitNumberRequired()) {
      this.rentForm.get('unitNumber')?.clearValidators();
      this.rentForm.get('unitNumber')?.updateValueAndValidity();
    }
  }

  /**
   * Initializes the reactive form with default values and validators.
   */
  private initializeForm(): void {
    const currentYear = new Date().getFullYear();
    this.rentForm = this.fb.group({
      propertyName: [{ value: '', disabled: true }, Validators.required],
      unitNumber: [''],
      tenantName: ['', Validators.required],
      month: ['', Validators.required],
      year: [
        currentYear,
        [Validators.required, Validators.min(2000), Validators.max(2100)],
      ],
      rentAmount: [0, [Validators.required, Validators.min(0)]],
      paymentStatus: ['', Validators.required],
      rentComment: [''],
    });
  }

  /**
   * Fetches the current user and retrieves related properties.
   */
  private initializeCurrentUser(): void {
    this.pbAuth.getCurrentUser().subscribe((user) => {
      this.currentUser = user?.email || '';
      if (this.currentUser) {
        // Subscribe to the properties data
        let relatedPropertyData =
          this.propertyListService.fetchRelatedProperties(this.currentUser);
        relatedPropertyData.subscribe((properties) => {
          this.propertiesData = properties;
        });
      }
    });
  }

  // Add this method to TenantCreateComponent class
  isUnitNumberRequired(): boolean {
    const requiredTypes = ['multiUnit', 'multiFamily', 'mixedUse'];
    return requiredTypes.includes(this.passedPropertyData?.type);
  }

  private async fetchTenant(propertyId: string) {
    try {
      let tenant = await this.pbCrud.getPropertyTenant(propertyId);
      if (tenant) {
        console.log('Fetched tenant:', tenant);
        this.tenantId = tenant.id;
        // Update the form with the tenant's full name
        const fullName = `${tenant['first_name']} ${tenant['last_name']}`.trim();
        this.rentForm.patchValue({ 
          tenantName: fullName
        });
      }
    } catch (error) {
      console.error('Error fetching tenant:', error);
    }
  }

  onSubmit() {
    if (this.rentForm.valid) {
      console.log(this.rentForm.value);
      // Here you would typically send the data to your backend
    }
  }
}
