import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropertyManagersComponent } from './list-property-managers.component';

describe('ListPropertyManagersComponent', () => {
  let component: ListPropertyManagersComponent;
  let fixture: ComponentFixture<ListPropertyManagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPropertyManagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPropertyManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
