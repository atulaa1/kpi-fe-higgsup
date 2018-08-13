import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmActiComponent } from './confirm-acti.component';

describe('ConfirmActiComponent', () => {
  let component: ConfirmActiComponent;
  let fixture: ComponentFixture<ConfirmActiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmActiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmActiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
