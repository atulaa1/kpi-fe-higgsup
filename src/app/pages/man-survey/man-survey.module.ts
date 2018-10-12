import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManSurveyComponent } from './man-survey.component';
import {ThemeModule} from '../../@theme/theme.module';
import { PersonalSurveyComponent } from './personal-survey.component';
import {TooltipModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    TooltipModule.forRoot(),
  ],
  declarations: [ManSurveyComponent, PersonalSurveyComponent],
})
export class ManSurveyModule { }
