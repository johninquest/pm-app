import { Component } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrl: './waitlist.component.scss'
})
export class WaitlistComponent { 
  waitlistEmail = new FormControl<string | null>('', [
    Validators.required,
    Validators.email,
  ]);

  onClickSubscribe() {
    console.log('Submitted data:', this.waitlistEmail.value);
   }

  getErrorMessage() {
    if (this.waitlistEmail.hasError('required')) {
      return 'Enter an e-mail address';
    }
    return this.waitlistEmail.hasError('email') ? 'Not a valid e-mail' : '';
  }

}
