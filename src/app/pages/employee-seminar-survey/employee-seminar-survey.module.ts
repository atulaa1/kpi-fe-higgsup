import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeSeminarSurveyComponent} from './employee-seminar-survey.component';
import {ThemeModule} from '../../@theme/theme.module';
import {SurveySeminarComponent} from './survey-seminar/survey-seminar.component';
import {CreatingSurveySeminarComponent} from './survey-seminar/creating-survey-seminar/creating-survey-seminar.component';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [EmployeeSeminarSurveyComponent, SurveySeminarComponent, CreatingSurveySeminarComponent],
  entryComponents: [CreatingSurveySeminarComponent],
  exports: [SurveySeminarComponent, CreatingSurveySeminarComponent],
})
export class EmployeeSeminarSurveyModule { }
