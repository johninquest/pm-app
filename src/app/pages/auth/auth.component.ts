import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  onClickGoogleAuth() {
    alert('Tapped google auth');
  }

  onClickFacebookAuth() {
    alert('Tapped facebook auth');
  }

  onClickEmailAuth() {
    alert('Tapped e-mail auth');
  }
}
