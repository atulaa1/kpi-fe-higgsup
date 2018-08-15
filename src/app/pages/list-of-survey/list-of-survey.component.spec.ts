import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSurveyComponent } from './list-of-survey.component';

describe('ListOfSurveyComponent', () => {
  let component: ListOfSurveyComponent;
  let fixture: ComponentFixture<ListOfSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
