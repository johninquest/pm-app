import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
/* import { InputComponent } from '../../time/input/input.component'; */
// import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { AuthComponent } from '../../../pages/auth/auth.component';
 

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss'
})
export class AlertDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private _dialogRef: MatDialogRef<AuthComponent>
  ) { }

  closeDialog() {
    return this._dialogRef.close();
  }

}
