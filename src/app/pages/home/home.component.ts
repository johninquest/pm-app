import { Component } from '@angular/core';
import { AuthService } from '../../utils/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private _fbAuthService: AuthService) {}

  tappedButton(message: string) {
    alert(`Tapped: ${message}`);
  } 

  currentUser: any;

  ngOnInit(): void {
    this._fbAuthService
      .currentlyLoggedUser()
      .subscribe((res) => {
        this.currentUser = res?.email;
        console.log('Current user:', res?.email)
      });
  }

}
