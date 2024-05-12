import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCreateComponent } from './id-create.component';

describe('IdCreateComponent', () => {
  let component: IdCreateComponent;
  let fixture: ComponentFixture<IdCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
