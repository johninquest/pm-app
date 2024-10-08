import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PROPERTY_CATEGORY_LIST } from '../../../shared/lists/dummy.list';
import { PropertyCategoryInterface } from '../../../utils/data.model';
import { COUNTRIES } from '../../../shared/lists/countries.list';
// import { UidService } from '../../../utils/uid.service';
import { PbService } from '../../../utils/pb.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../utils/auth.service';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrl: './property-create.component.scss',
})
export class PropertyCreateComponent {
  currentUser: any;
  currentUserUid: any;

  propertyForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    // private ids: UidService,
    private _fbAuthService: AuthService,
    private _pbService: PbService,
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
    if (this.propertyForm.valid && this.currentUserUid) {
      // alert('Tapped save property!');
      // console.log(this.propertyForm.value);
      let propertyData = {
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
        creator_uid: this.currentUserUid
      };
      let _saveRequest = this._pbService.createProperty(propertyData);
      _saveRequest
        .then((res) => {
          console.log('Saved data:', res); 
          this._router.navigateByUrl('properties')
        })
        .catch((err) => console.log('Error:', err));
    }else {
      alert("There was an issue");
    }
  }

  propertyCategoryList: PropertyCategoryInterface[] = PROPERTY_CATEGORY_LIST;
  countryList: string[] = COUNTRIES;

  ngOnInit(): void {
    /* const newPropertyId = this.ids.generateCustom(13); */
    this._fbAuthService.currentlyLoggedUser().subscribe((res) => {
      this.currentUser = res?.email; 
      this.currentUserUid = res?.uid;
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
