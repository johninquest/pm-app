import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ID_CATEGORY_LIST, SubCategoryEducation, SubCategoryFinance, SubCategoryGovernment, SubCategoryHealth, SubCategoryInsurance, SubCategoryOthers, SubCategoryProfessional, SubCategorySocialMedia, SubCategorySubscription, SubCategoryTravel, SubCategoryUtilities } from '../../../shared/category.list';

@Component({
  selector: 'app-id-create',
  templateUrl: './id-create.component.html',
  styleUrl: './id-create.component.scss'
})
export class IdCreateComponent {

  idForm = new FormGroup({
    idCategory: new FormControl<string>('', Validators.required),
    idType: new FormControl<string>(''),
    issuer: new FormControl<string>(''),
    idNumber: new FormControl<string>(''),
    validFrom: new FormControl<string>(''),
    validTo: new FormControl<string>(''),
    comment: new FormControl<string>(''),
  });

  categoryList: string[] = ID_CATEGORY_LIST;

  renderTypeList(selectedCategory: string): string[] {
    if (selectedCategory) {
      switch (selectedCategory) {
        case 'education':
          return SubCategoryEducation;
        case 'finance':
          return SubCategoryFinance;
        case 'government':
          return SubCategoryGovernment; // Assuming there's subCategoryGovernment in your category.list 
        case 'health':
          return SubCategoryHealth;
        case 'insurance':
          return SubCategoryInsurance;
        case 'professional':
          return SubCategoryProfessional;
        case 'shopping':
          return [];
        case 'subscription':
          return SubCategorySubscription;
        case 'socialmedia':
          return SubCategorySocialMedia;
        case 'travel':
          return SubCategoryTravel;
        case 'utilities':
          return SubCategoryUtilities;
        default:
          return [];
      }
    }
    else {
      return [];
    }

  }

  onClickCancel() {
    history.back()
  }

  onClickSave() {
    console.log('IdData', this.idForm.value)
    alert('Tapped save button!')
  }

  onClickEdit() {
    this.idForm.enable()
  }

}
