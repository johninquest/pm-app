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

  /* Generic CRUD operations */
  async createRecord(collectionName: string, data: any) {
    return await this.pb.collection(collectionName).create(data);
  }

  async getRecordById(
    collectionName: string, 
    recordId: string,
    query: { expand?: string } = {}
  ) {
    return await this.pb.collection(collectionName).getOne(recordId, query);
  }

  async getAllRecordsAsList(
    collectionName: string,
    query: { sort?: string; filter?: string; expand?: string } = {}
  ) {
    return await this.pb.collection(collectionName).getFullList(query);
  }

  async updateRecord(collectionName: string, recordId: string, data: any) {
    return await this.pb.collection(collectionName).update(recordId, data);
  }

  async deleteRecord(collectionName: string, recordId: string) {
    return await this.pb.collection(collectionName).delete(recordId);
  } 

  async getAllRecordsAsListSize(
    collectionName: string,
    query: { sort?: string; filter?: string; expand?: string } = {}
   ): Promise<number> {
    const records = await this.getAllRecordsAsList(collectionName, query);
    return records.length;
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
    // console.log('Fetched property record:', record)
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

  async getExpenseById(expenseId: string) {
    let record = await this.pb.collection('expenses').getOne(expenseId);
    // console.log('Fetched property record:', record)
    return record;
  }

  async updateExpense(expenseData: any) {}

  async deleteExpense(expenseId: string) {}

  /* Tenant operations */
  async getAllTenantsAsList(currentUser: string) {
    let expenseCollectionName = 'tenants';
    let records = await this.pb.collection(expenseCollectionName).getFullList({
      sort: '-created',
      filter: `created_by = "${currentUser}"`,
    });
    return records;
  }

  async createTenant(expenseData: any) {
    let record = await this.pb.collection('tenants').create(expenseData);
    return record;
  }

  // Custom methods to fetch tenant related to property
  /*   async getPropertyTenants(propertyId: string) {
    try {
      const records = await this.pb.collection('tenants').getList(1, 50, {
        filter: `property_id = "${propertyId}"`,
        fields: 'id,first_name,last_name',
        sort: '-created'
      });
  
      return records.items;
    } catch (error) {
      console.error('Error fetching property tenants:', error);
      throw error;
    }
  } */
  async getPropertyTenant(propertyId: string) {
    try {
      const record = await this.pb
        .collection('tenants')
        .getFirstListItem(`property_id = "${propertyId}"`);

      return record;
    } catch (error) {
      console.error('Error fetching property tenant:', error);
      throw error;
    }
  }
}
