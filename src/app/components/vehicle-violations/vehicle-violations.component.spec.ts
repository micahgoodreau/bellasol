import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleViolationsComponent } from './vehicle-violations.component';

describe('VehicleViolationsComponent', () => {
  let component: VehicleViolationsComponent;
  let fixture: ComponentFixture<VehicleViolationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleViolationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
