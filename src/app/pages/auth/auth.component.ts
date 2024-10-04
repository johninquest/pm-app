import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../utils/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  constructor(private _router: Router, private _fbAuthService: AuthService) {}
  onClickGoogleAuth() {
    let googleAuthResponse = this._fbAuthService.googleAuth();
    googleAuthResponse
      .then((res) => {
        // console.log('Google auth response => ', res);
        res.user.getIdToken().then((t) => {
          sessionStorage.setItem('popati_access_token', t);
          this._router.navigateByUrl('/home');
        });
      })
      .catch((e) => {
        console.log('Error => ', e);
      });
  }

  onClickFacebookAuth() {
    alert('Tapped facebook auth');
  }

  onClickEmailAuth() {
    // alert('Tapped e-mail auth'); 
    this._router.navigateByUrl('/auth/email');
  }
}
