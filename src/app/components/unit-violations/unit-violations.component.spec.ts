import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitViolationsComponent } from './unit-violations.component';

describe('UnitViolationsComponent', () => {
  let component: UnitViolationsComponent;
  let fixture: ComponentFixture<UnitViolationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitViolationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
