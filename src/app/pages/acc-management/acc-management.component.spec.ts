import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccManagementComponent } from './acc-management.component';

describe('AccManagementComponent', () => {
  let component: AccManagementComponent;
  let fixture: ComponentFixture<AccManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
