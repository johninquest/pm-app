import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
// import { PbAuthService } from './pb-auth.service';

@Injectable({
  providedIn: 'root',
})
export class PbCrudService {
  private pb: PocketBase;
  
  constructor() {
    this.pb = new PocketBase('https://api.johnapps.de/v1');
  }

  /* Property operations */
  propertiesCollection: string = 'properties';
  async createProperty(propertyData: any) {
    let record = await this.pb.collection('properties').create(propertyData);
    return record;
  }

  async getAllPropertyAsList(currentUser: string) {
    let records = await this.pb.collection('properties').getFullList({
      sort: '-created',
      filter: `created_by = "${currentUser}"`,
    });
    // console.log('Property list:', records);
    return records;
  }

  async getPropertyById(propertyId: string) {
    let record = await this.pb.collection('properties').getOne(propertyId); 
    console.log('Fetched property record:', record)
    return record;
  } 

    /* Expense operations */ 
    async getAllExpensesAsList(currentUser: string) {
      let expenseCollectionName = 'expenses';
      let records = await this.pb.collection(expenseCollectionName).getFullList({
        sort: '-created',
        filter: `created_by = "${currentUser}"`,
      });
      return records;
    }  

    async createExpense(expenseData: any) {
      let record = await this.pb.collection('expenses').create(expenseData);
      return record;
    } 

    async fetchExpenseById(expenseData: any) {} 

    async updateExpense(expenseData: any) {} 

    async deleteExpense(expenseId: string) {} 

}
