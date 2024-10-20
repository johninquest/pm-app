import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PbService } from '../../../utils/pb.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss'
})
export class PropertyDetailsComponent { 
  constructor(private _aRoute: ActivatedRoute, private _pbService: PbService) { } 

  ngOnInit() {
    this._aRoute.paramMap.subscribe(params => {
      let id: string = params.get('id') ?? '';
      if(id) {
        this._pbService.getPropertyById(id).then(data => this.propertyData = data).catch(err => console.log('Error', err))
      }
      // console.log('Complete row data:', params.get('created_by'))
      // Use the id to fetch property details
    });
  } 

  propertyData: any; 

  getPropertyData(propId: string) {
    if(propId) {}

  }

}
