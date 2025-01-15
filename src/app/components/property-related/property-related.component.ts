import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-property-related',
  templateUrl: './property-related.component.html',
  styleUrl: './property-related.component.scss'
})
export class PropertyRelatedComponent { 

    @Input() title: string = '';
    @Input() placeholderText: string = '';
    @Input() viewButtonText: string = '';
    @Input() addButtonText: string = '';
    @Input() onView: () => void = () => { };
    @Input() onAdd: () => void = () => { };

}
