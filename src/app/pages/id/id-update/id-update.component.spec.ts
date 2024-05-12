import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdUpdateComponent } from './id-update.component';

describe('IdUpdateComponent', () => {
  let component: IdUpdateComponent;
  let fixture: ComponentFixture<IdUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
