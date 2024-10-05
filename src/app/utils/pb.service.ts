import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

/* const pb = new PocketBase('http://127.0.0.1:8090'); 
const authData = await pb.admins.authWithPassword('admin@johnapps.de', '#Johnapps97'); */

@Injectable({
  providedIn: 'root',
})
export class PbService {
  pb = new PocketBase('http://127.0.0.1:8090'); 
  authData = this.pb.collection('users').authWithOAuth2({ provider: 'google' });
  /* authData = this.pb.admins.authWithPassword(
    'admin@johnapps.de',
    '#Johnapps97'
  ); */

  constructor() {} 

  async socialAuth() {
    // after the above you can also access the auth data from the authStore
    console.log(this.pb.authStore.isValid);
    console.log(this.pb.authStore.token);
    // console.log(this.pb.authStore.model.id);
  } 

 /*  async socialAuth() {
    let authData = await this.pb.collection('users').authWithOAuth2({ provider: 'google' });

    // after the above you can also access the auth data from the authStore
    console.log(this.pb.authStore.isValid);
    console.log(this.pb.authStore.token);
    // console.log(this.pb.authStore.model.id);
  } */

  async getAllUsersAsList() {
    let records = await this.pb.collection('popati_user').getFullList({
      sort: '-created',
    });
    // return records;
    console.log('Userlist:', records); 
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
}
