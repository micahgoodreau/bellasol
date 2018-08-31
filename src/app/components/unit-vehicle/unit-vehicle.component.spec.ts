import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitVehicleComponent } from './unit-vehicle.component';

describe('UnitVehicleComponent', () => {
  let component: UnitVehicleComponent;
  let fixture: ComponentFixture<UnitVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
