import { Injectable } from '@angular/core';
// import { openDB } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class IdbService {
  constructor() {} 
  private idDB: string = 'idDB';
  private userDB: string = 'userDB';
  /* private dbName = 'pockid_db'; // Replace with your desired name */
  private dbVersion = 1; // Increment for schema changes
  private userStore: string = 'userData';
  private idStore: string = 'idData';
  
  
  openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.idDB, 1);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db: IDBDatabase = (event.target as any).result;
        db.createObjectStore(this.idStore, { keyPath: 'id', autoIncrement: true });
      };
    });
  }

  saveFormData(formData: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await this.openDatabase();
        const transaction = db.transaction([this.idStore], 'readwrite');
        const store = transaction.objectStore(this.idStore);
        const request = store.add(formData);
        
        request.onerror = () => {
          console.error('Error saving form data:', request.error);
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  // User processes 
  openDatabaseForUser(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.userDB, 1);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db: IDBDatabase = (event.target as any).result;
        db.createObjectStore(this.userStore, { keyPath: 'key'});
      };
    });
  } 

  saveUserData(formData: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await this.openDatabaseForUser();
        const transaction = db.transaction([this.userStore], 'readwrite');
        const store = transaction.objectStore(this.userStore);
        const key = 'userData'; // Use a fixed key instead of auto-generated ID
        const request = store.put({ key, formData }); // Use put instead of add to overwrite existing data
        
        request.onerror = () => {
          console.error('Error saving form data:', request.error);
          reject(request.error);
        };
  
        request.onsuccess = () => {
          resolve();
        };
      } catch (error) {
        reject(error);
      }
    });
  } 

  fetchUserData(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await this.openDatabaseForUser();
        const transaction = db.transaction([this.userStore], 'readonly');
        const store = transaction.objectStore(this.userStore);
        const request = store.get('userData'); // Fetch the object using the fixed key

        request.onerror = () => {
          console.error('Error fetching form data:', request.error);
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve(request.result);
        };
      } catch (error) {
        reject(error);
      }
    });
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
