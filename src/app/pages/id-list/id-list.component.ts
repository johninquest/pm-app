import { Component } from '@angular/core';
import { IdbService } from '../../utils/idb.service';

@Component({
  selector: 'app-id-list',
  templateUrl: './id-list.component.html',
  styleUrl: './id-list.component.scss'
})
export class IdListComponent {
  idbData: any;
  constructor(private _idbs: IdbService) { }

  ngOnInit(): void {
    this.getIdList()
  }

  getIdList() {
    this._idbs.fetchIdsAll().then(data => {
      if (data) {
        /* console.log('Stored ids:', data)
        console.log('Stored data type :', typeof data)
        console.log('Stored ids 0:', data[0]) */
        this.idbData = data;
      }
    })
  }

}
