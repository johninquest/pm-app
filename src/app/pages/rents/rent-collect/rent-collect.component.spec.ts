import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCollectComponent } from './rent-collect.component';

describe('RentCollectComponent', () => {
  let component: RentCollectComponent;
  let fixture: ComponentFixture<RentCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentCollectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
