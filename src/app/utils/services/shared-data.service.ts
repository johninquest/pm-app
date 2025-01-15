import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { } 

  private data: any;

  setData(data: any) {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }
}
