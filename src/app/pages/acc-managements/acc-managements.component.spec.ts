import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccManagementsComponent } from './acc-managements.component';

describe('AccManagementsComponent', () => {
  let component: AccManagementsComponent;
  let fixture: ComponentFixture<AccManagementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccManagementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccManagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
