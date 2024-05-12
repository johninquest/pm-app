import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdReadComponent } from './id-read.component';

describe('IdReadComponent', () => {
  let component: IdReadComponent;
  let fixture: ComponentFixture<IdReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
