import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTenantsComponent } from './unit-tenants.component';

describe('UnitTenantsComponent', () => {
  let component: UnitTenantsComponent;
  let fixture: ComponentFixture<UnitTenantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitTenantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
