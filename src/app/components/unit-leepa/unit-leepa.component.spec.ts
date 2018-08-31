import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitLeepaComponent } from './unit-leepa.component';

describe('UnitLeepaComponent', () => {
  let component: UnitLeepaComponent;
  let fixture: ComponentFixture<UnitLeepaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitLeepaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitLeepaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
