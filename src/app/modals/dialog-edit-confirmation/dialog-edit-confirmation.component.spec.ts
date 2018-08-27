import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditConfirmationComponent } from './dialog-edit-confirmation.component';

describe('DialogEditConfirmationComponent', () => {
  let component: DialogEditConfirmationComponent;
  let fixture: ComponentFixture<DialogEditConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
