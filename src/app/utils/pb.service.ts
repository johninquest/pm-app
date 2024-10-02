import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

/* const pb = new PocketBase('http://127.0.0.1:8090'); 
const authData = await pb.admins.authWithPassword('admin@johnapps.de', '#Johnapps97'); */

@Injectable({
  providedIn: 'root',
})
export class PbService {
  pb = new PocketBase('http://127.0.0.1:8090');
  authData = this.pb.admins.authWithPassword(
    'admin@johnapps.de',
    '#Johnapps97'
  );

  constructor() {}

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
}
