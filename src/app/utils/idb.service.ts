import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  constructor() { }

  async openIndexedDB() {
    const dbName = 'myDB'; // Replace with your desired name
    const dbVersion = 1; // Increment for schema changes

    const dbPromise = await openDB(dbName, dbVersion, {
      upgrade(db: any) {
        // Create object stores here
        const store = db.createObjectStore('myStore', {
          keyPath: 'id', // Optional: Set a key path for automatic key generation
          autoIncrement: true // Optional: Generate unique keys automatically
        });

        // Create indexes (optional)
        // store.createIndex('nameIndex', 'name', { unique: false });
      },
    });

    return dbPromise;
  }

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
