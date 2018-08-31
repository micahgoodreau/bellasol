import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitNotesComponent } from './unit-notes.component';

describe('UnitNotesComponent', () => {
  let component: UnitNotesComponent;
  let fixture: ComponentFixture<UnitNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
