import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActiComponent } from './create-acti.component';

describe('CreateActiComponent', () => {
  let component: CreateActiComponent;
  let fixture: ComponentFixture<CreateActiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
