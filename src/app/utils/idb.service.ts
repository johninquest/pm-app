import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  constructor() { }

  async openIndexedDB() {
    const DB_NAME = 'test_db'; // Replace with your desired name
    // const dbName = 'pockid_db'; // Replace with your desired name
    const DB_VERSION = 1; // Increment for schema changes

    const dbPromise = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db: any) { 
          // Create object store for users
    if (!db.objectStoreNames.contains('user_data')) {
      const userStore = db.createObjectStore('user_data', { keyPath: 'id' });
      /* userStore.createIndex('username', 'username', { unique: true });
      userStore.createIndex('email', 'email', { unique: true }); */
    } 

     // Create object store for products
     if (!db.objectStoreNames.contains('id_data')) {
      const idStore = db.createObjectStore('id_data', { keyPath: 'id', autoIncrement: true });
      /* productStore.createIndex('name', 'name', { unique: false });
      productStore.createIndex('category', 'category', { unique: false }); */
    }
      },
    });

    return dbPromise;
  } 

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
    const db = await this.openIndexedDB();
    const tx = db.transaction('myStore', 'readwrite');
    const store = tx.objectStore('myStore');
    await store.add(data);
    tx.oncomplete;
  }

  async getData(key: string | number) {
    const db = await this.openIndexedDB();
    const tx = db.transaction('myStore', 'readonly');
    const store = tx.objectStore('myStore');
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
  }






}
