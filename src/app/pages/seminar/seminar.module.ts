import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeminarComponent} from './seminar.component';
import {ThemeModule} from '../../@theme/theme.module';
import {PersonalSeminarComponent} from './personal-seminar/personal-seminar.component';
import {SurveySeminarComponent} from './survey-seminar/survey-seminar.component';
import {CreatingSurveySeminarComponent} from './survey-seminar/creating-survey-seminar/creating-survey-seminar.component';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [SeminarComponent, PersonalSeminarComponent, SurveySeminarComponent, CreatingSurveySeminarComponent],
  entryComponents: [CreatingSurveySeminarComponent]
})
export class SeminarModule { }
