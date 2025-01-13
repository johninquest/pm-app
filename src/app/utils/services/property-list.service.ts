import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PbCrudService } from '../pocketbase/pb-crud.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyListService {
  private propertiesDataSubject = new BehaviorSubject<any[]>([]);
  propertiesData$ = this.propertiesDataSubject.asObservable();

  constructor(private _pbCrud: PbCrudService) {}

  fetchRelatedProperties(userId: string): Observable<any[]> {
    if (userId) {
      this._pbCrud.getAllPropertyAsList(userId)
        .then(data => {
          this.propertiesDataSubject.next(data);
        })
        .catch(error => {
          console.error('Error fetching properties:', error);
          this.propertiesDataSubject.next([]);
        });
    } else {
      this.propertiesDataSubject.next([]);
    }
    return this.propertiesData$;
  }

  get currentProperties(): any[] {
    return this.propertiesDataSubject.value;
  }
}