import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PbAuthService } from '../../utils/pocketbase/pb-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private _router: Router, private _pbAuthService: PbAuthService) {}

/*   onClickLogout() {
    this._router.navigateByUrl('')

  } */

/*   onClickLogOut() {
    let logoutResponse = this._fbAuthService.logUserOut();
    logoutResponse
      .then(() => {
        sessionStorage.removeItem('popati_access_token');
        // sessionStorage.removeItem('db_name');
        this._router.navigateByUrl('/auth');
      })
      .catch((e) =>
        console.log('The following error occured during logout =>', e)
      );
  } */ 

  onClickLogOut() {
    this._pbAuthService.logout();
  }

}
