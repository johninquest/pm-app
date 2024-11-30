import { Component } from '@angular/core';
import { PbAuthService } from '../../utils/pocketbase/pb-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private _pbAuth: PbAuthService) {}

  tappedButton(message: string) {
    alert(`Tapped: ${message}`);
  } 

  currentUser: any;

  ngOnInit(): void {
      this._pbAuth.getCurrentUser().subscribe(user => this.currentUser = user?.email)
  }

}
