import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../dialogs/alert-dialog/alert-dialog.component';
import { PbAuthService } from '../../utils/pocketbase/pb-auth.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss'
})
export class EmailComponent {
  constructor(
    private _router: Router,
    private _dialog: MatDialog, 
    private _pbAuthService: PbAuthService
  ) { }

  ngOnInit(): void { }

  hidePassword: boolean = true;

  signinForm = new FormGroup({
    userId: new FormControl<string | null>(null, Validators.required),
    userPassword: new FormControl<string | null>(null, Validators.required),
    rememberMe: new FormControl<true | false>(false),
  });

/*   onClickLogin() {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
    } else {
      let loginResponse = this._fbAuthService.logUserIn(
        this.signinForm.value.userId!,
        this.signinForm.value.userPassword!
      );
      loginResponse
        .then((val: any) => {
          val.user.getIdToken().then((t: any) => {
            sessionStorage.setItem('popati_access_token', t);
            this._router.navigateByUrl('/home');
          });
        })
        .catch((e: any) => {
          if (e.code === 'auth/invalid-email') {
            // let _message: string = 'Ungültige E-Mail-Adresse!';
            let _message: string = 'Invalid email address!';
            return this.openDialog(_message);
          }
          if (e.code === 'auth/user-not-found') {
            // let _message: string = 'Benutzer nicht gefunden!'; 
            let _message: string = 'User not found!';
            return this.openDialog(_message);
          }
          if (e.code === 'auth/wrong-password') {
            // let _message: string = 'Falsches Passwort!'; 
            let _message: string = 'Incorrect password!';
            return this.openDialog(_message);
          } else {
            // let _message: string = `Ein Fehler ist aufgetreten: \n${e.code} \n${e.message}`; 
            let _message: string = `An error has occurred: \n${e.code} \n${e.message}`;
            return this.openDialog(_message);
          }
        });
    }
  } */ 

    async onClickLogin() {
      if (this.signinForm.invalid) {
        this.signinForm.markAllAsTouched();
        return;
      }
  
      try {
        await this._pbAuthService.login(
          this.signinForm.value.userId!,
          this.signinForm.value.userPassword!
        );
        // Navigation is handled in the PbAuthService
      } catch (error: any) {
        let message: string;
        
        // Handle PocketBase specific errors
        if (error.message.includes('Failed to authenticate')) {
          message = 'Invalid email or password!';
        } else if (error.message.includes('validation')) {
          message = 'Invalid email format!';
        } else if (error.message.includes('Missing required')) {
          message = 'Please fill in all required fields!';
        } else {
          message = `An error has occurred: ${error.message}`;
        }
        
        this.openDialog(message);
      }
    }

  openDialog(alertMessage: string) {
    this._dialog.open(AlertDialogComponent, {
      autoFocus: false,
      data: alertMessage,
    });
  }

  onClickBack() {
    history.back();
  }

}
