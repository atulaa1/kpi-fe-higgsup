import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskSaveComponent } from './ask-save.component';

describe('AskSaveComponent', () => {
  let component: AskSaveComponent;
  let fixture: ComponentFixture<AskSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
