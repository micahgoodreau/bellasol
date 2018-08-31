import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOwnersComponent } from './unit-owners.component';

describe('UnitOwnersComponent', () => {
  let component: UnitOwnersComponent;
  let fixture: ComponentFixture<UnitOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitOwnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
