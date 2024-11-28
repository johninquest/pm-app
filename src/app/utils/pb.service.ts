import { Injectable } from '@angular/core'; 
import { BehaviorSubject, Observable } from 'rxjs';
import PocketBase from 'pocketbase';
import { AuthService } from './auth.service';

/* const pb = new PocketBase('http://127.0.0.1:8090'); 
const authData = await pb.admins.authWithPassword('admin@johnapps.de', '#Johnapps97'); */

@Injectable({
  providedIn: 'root',
})
export class PbService {
  pb = new PocketBase('https://api.johnapps.de/v1');
  // pb = new PocketBase('https://popati.web.app'); 
  // authData = this.pb.collection('users').authWithOAuth2({ provider: 'google' });
  /*   authData = this.pb.admins.authWithPassword(
      'johninquest@gmail.com',
      '#Pocketbase97'
    ); */ 
  private pbAuthStore = new BehaviorSubject<boolean>(false);
  private pbCurrentUser = new BehaviorSubject<any>(null);

  constructor(private _fbAuth: AuthService) { 
    this._fbAuth.currentlyLoggedUser().subscribe((res) => {
      console.log('Current user:', res?.email);
      this.currentUser = res?.email; 
    });

  }
  currentUser: any;

  async pbUserAuth(userId: string, userPassword: string) {
    let authData = await this.pb.collection('users').authWithPassword(userId, userPassword);
    console.log(this.pb.authStore.isValid);
    console.log(this.pb.authStore.token);
    console.log(this.pb.authStore.model?.['id']);
  } 

  // Google auth 
  async pbGoogleSignIn() {
    const authData = await this.pb.collection('users').authWithOAuth2({ provider: 'google' }); 
    console.log(this.pb.authStore.isValid);
    console.log(this.pb.authStore.token);
    // console.log(this.pb.authStore.record?.['id']);
  }

  // Log out 
  pbLogout() {
    this.pb.authStore.clear();
  }

  async getAllUsersAsList() {
    let records = await this.pb.collection('users').getFullList({
      sort: '-created', filter: `created_by = ${this.currentUser}`
    });
    // return records;
    console.log('AuthUserList:', records);
    return records;
  }

  async getSpecificUser() {
    const record = await this.pb.collection('popati_user').getOne('RECORD_ID', {
      expand: 'relField1,relField2.subRelField',
    });
  }

  async createUser(userData: any) {
    let record = await this.pb.collection('popati_user').create(userData);
    return record;
  }


  /* Property operations */
  async createProperty(propertyData: any) {
    let record = await this.pb.collection('property').create(propertyData);
    return record;
  }

  async getAllPropertyAsList(currentUser: string) {
    let records = await this.pb.collection('properties').getFullList({
      sort: '-created', filter: `created_by = "${currentUser}"`
    });
    console.log('Property list:', records);
    return records;
  } 

  async getPropertyById(propertyId: string) {
    let record = await this.pb.collection('property').getOne(propertyId); 
    return record;
  }
}

/*   
  async socialAuth() {
    // after the above you can also access the auth data from the authStore
    console.log(this.pb.authStore.isValid);
    console.log(this.pb.authStore.token);
    console.log(this.pb.authStore.model?.['id']);
  } */