import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PROPERTY_CATEGORY_LIST } from '../../../shared/lists/data.list';
import { PropertyCategoryInterface } from '../../../utils/data.model';
import { COUNTRIES } from '../../../shared/lists/countries.list';
import { Router } from '@angular/router';
import { PbAuthService } from '../../../utils/pocketbase/pb-auth.service';
import { PbCrudService } from '../../../utils/pocketbase/pb-crud.service';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrl: './property-create.component.scss',
})
export class PropertyCreateComponent {
  currentUser: string = '';
  // currentUserUid: any;

  propertyForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    // private ids: UidService,
    // private _fbAuthService: AuthService,
    private _pbAuthService: PbAuthService,
    private _pbCrudService: PbCrudService,
    private _router: Router
  ) {
    this.propertyForm = this.fb.group({
      propertyName: ['', Validators.required],
      propertyType: ['', Validators.required],
      numberOfUnits: [1, [Validators.min(1)]],
      /*    purchaseDate: [''],
            purchasePrice: [0], */
      currentValue: [],
      constructionYear: [''],
      /* Address */
      street: [''],
      city: ['', Validators.required],
      postCode: [''],
      state: [''],
      country: ['', Validators.required],
    });
  }

  isMultiUnitProperty(): boolean {
    let pType = this.propertyForm.get('propertyType')?.value;
    return ['multiUnit', 'multiFamily', 'mixedUse'].includes(pType);
  }

  onSubmit() {
    if (this.propertyForm.valid && this.currentUser) {
      // alert('Tapped save property!');
      // console.log(this.propertyForm.value);
      let propertyPayload: object = {
        name: this.propertyForm.value.propertyName,
        type: this.propertyForm.value.propertyType,
        number_of_units: this.propertyForm.value.numberOfUnits,
        construction_year: this.propertyForm.value.constructionYear,
        address: {
          street: this.propertyForm.value.street,
          postcode: this.propertyForm.value.postCode,
          city: this.propertyForm.value.city,
          state: this.propertyForm.value.state,
          country: this.propertyForm.value.country,
        },
        created_by: this.currentUser,
        // creator_uid: this.currentUserUid
      };
      let _saveRequest = this._pbCrudService.createProperty(propertyPayload);
      _saveRequest
        .then((res) => {
          console.log('Saved data:', res);
          this._router.navigateByUrl('properties')
        })
        .catch((err) => console.log('Error:', err));
    } else {
      alert("There was an issue. You must be logged in to execute this operation");
    }
  }

  propertyCategoryList: PropertyCategoryInterface[] = PROPERTY_CATEGORY_LIST;
  countryList: string[] = COUNTRIES;

  ngOnInit(): void {
    /* const newPropertyId = this.ids.generateCustom(13); */
    this._pbAuthService.getCurrentUser().subscribe((res) => {
      this.currentUser = res?.email;
      console.log('Current user on property create page:', this.currentUser);
      // this.currentUserUid = res?.uid;
    });
  }
}

/*   isMultiUnitProperty(): boolean {
    let propertyType = this.propertyForm.get('type')?.value; 
    console.log('Property type', this.propertyForm.get('type')?.value);
    if (propertyType && propertyType === 'multiUnit') {
      return true;
    }
    if (propertyType && propertyType === 'multiFamily') {
      return true;
    } else {
      return false;
    }
  }  */
