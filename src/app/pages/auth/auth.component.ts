import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../utils/auth.service'; 
import { PbAuthService } from '../../utils/pocketbase/pb-auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent { 
  error: string = '';
  constructor(private _router: Router, private _fbAuthService: AuthService, private _pbAuthService: PbAuthService) {}
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

  async onClickGoogleAuth2() {
    try {
      await this._pbAuthService.loginWithGoogle();
    } catch (error: any) {
      this.error = error?.message;
    }
  }

  onClickFacebookAuth() {
    alert('Tapped facebook auth');
  }

  onClickEmailAuth() {
    // alert('Tapped e-mail auth'); 
    this._router.navigateByUrl('/auth/email');
  }
}
