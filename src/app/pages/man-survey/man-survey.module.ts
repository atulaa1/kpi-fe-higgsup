import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManSurveyComponent } from './man-survey.component';
import {ThemeModule} from '../../@theme/theme.module';
import { PersonalSurveyComponent } from './personal-survey/personal-survey.component';
import {TooltipModule} from 'ngx-bootstrap';
import {EmployeeSeminarSurveyModule} from '../employee-seminar-survey/employee-seminar-survey.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    TooltipModule.forRoot(),
    EmployeeSeminarSurveyModule,
  ],
  declarations: [ManSurveyComponent, PersonalSurveyComponent],
})
export class ManSurveyModule { }
