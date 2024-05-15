import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class IdbService {
  constructor() {}

/*   async openIndexedDB() {
    const DB_NAME = 'test_db'; // Replace with your desired name
    // const dbName = 'pockid_db'; // Replace with your desired name
    const DB_VERSION = 1; // Increment for schema changes
    const USER_STORE = 'user_data';
    const ID_STORE = 'user_data';
  } */

  /*   async function addUser(user: any) {
    const db = await dbPromise;
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    await store.add(user);
    await tx.done;
  }
  
  async function addId(id: any) {
    const db = await dbPromise;
    const tx = db.transaction('products', 'readwrite');
    const store = tx.objectStore('products');
    await store.add(product);
    await tx.done;
  } */

  async addData(data: any) {
    console.log('Passed data:', data);
    const db1 = await openDB('db1', 1);
    db1
      .put('store1', 'hello again!!', 'new message')
      .then((result) => {
        console.log('success!', result);
      })
      .catch((err) => {
        console.error('error: ', err);
      });
    db1.close();
  }
  /* 
  async getData(key: string | number) {
    const db = await this.openIndexedDB();
    const tx = db.transaction('user_data', 'readonly');
    const store = tx.objectStore('user_data');
    const item = await store.get(key);
    return item;
  }

  async updateData(key: string | number, data: any) {
    const db = await this.openIndexedDB();
    const tx = db.transaction('myStore', 'readwrite');
    const store = tx.objectStore('myStore');
    await store.put(data, key);
    tx.oncomplete;
  }

  async deleteData(key: string | number) {
    const db = await this.openIndexedDB();
    const tx = db.transaction('myStore', 'readwrite');
    const store = tx.objectStore('myStore');
    await store.delete(key);
    tx.oncomplete;
  } */
}
