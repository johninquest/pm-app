import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PbService } from '../../../utils/pb.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss'
})
export class PropertyDetailsComponent {
  constructor(private _aRoute: ActivatedRoute, private _router: Router, private _pbService: PbService) { }

  ngOnInit() {
    this._aRoute.paramMap.subscribe(params => {
      let id: string = params.get('id') ?? '';
      if (id) {
        this._pbService.getPropertyById(id).then(data => this.propertyData = data).catch(err => console.log('Error', err))
      }
      // console.log('Complete row data:', params.get('created_by'))
      // Use the id to fetch property details
    });
  }

  propertyData: any;

  getPropertyData(propId: string) {
    if (propId) { }

  }

  onBack() {
    // Add your navigation logic here, for example:
    history.back();
  }

  onEdit() {
    // Add your edit logic here, for example:
    // this.router.navigate(['edit'], { relativeTo: this.route }); 
    alert('Under construction!')
  }

  onDelete() {
    alert('Under construction!')
  } 

  underConstructionButton() {
    alert('Under construction!')
  }

}
