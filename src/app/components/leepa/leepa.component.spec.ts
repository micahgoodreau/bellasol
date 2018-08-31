import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeepaComponent } from './leepa.component';

describe('LeepaComponent', () => {
  let component: LeepaComponent;
  let fixture: ComponentFixture<LeepaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeepaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeepaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
