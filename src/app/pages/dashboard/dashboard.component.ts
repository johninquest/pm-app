import { Component } from '@angular/core'; 
import { PbAuthService } from '../../utils/pocketbase/pb-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent { 

  constructor(private pbAuth: PbAuthService) {}

  tappedButton(message: string) {
    alert(`Tapped: ${message}`);
  } 

  currentUser: any; 

  ngOnInit(): void {
    this.pbAuth.getCurrentUser().subscribe(user => {
      // console.log(user);
      this.currentUser = user;
    })
}

}
