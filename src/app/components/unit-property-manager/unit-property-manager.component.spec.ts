import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitPropertyManagerComponent } from './unit-property-manager.component';

describe('UnitPropertyManagerComponent', () => {
  let component: UnitPropertyManagerComponent;
  let fixture: ComponentFixture<UnitPropertyManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitPropertyManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitPropertyManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
