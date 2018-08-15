import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiManagementComponent } from './acti-management.component';

describe('ActiManagementComponent', () => {
  let component: ActiManagementComponent;
  let fixture: ComponentFixture<ActiManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiManagementComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
