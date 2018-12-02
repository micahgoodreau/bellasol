import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentslistOwnersComponent } from './componentslist-owners.component';

describe('ComponentslistOwnersComponent', () => {
  let component: ComponentslistOwnersComponent;
  let fixture: ComponentFixture<ComponentslistOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentslistOwnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentslistOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
