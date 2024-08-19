import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrl: './version.component.scss'
})
export class VersionComponent {
  currentAppVersion: any;
  constructor() {
    this.currentAppVersion = environment.appVersion;
  }

}
