import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVehiclesComponent } from './search-vehicles.component';

describe('SearchVehiclesComponent', () => {
  let component: SearchVehiclesComponent;
  let fixture: ComponentFixture<SearchVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
