import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccManagementLateComponent } from './acc-management-late.component';

describe('AccManagementLateComponent', () => {
  let component: AccManagementLateComponent;
  let fixture: ComponentFixture<AccManagementLateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccManagementLateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccManagementLateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
