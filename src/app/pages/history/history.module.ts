import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HistoryComponent} from './history.component';
import {ThemeModule} from '../../@theme/theme.module';
import { PersonalSurveyDetailComponent } from './personal-survey-detail/personal-survey-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [HistoryComponent, PersonalSurveyDetailComponent],
  entryComponents: [PersonalSurveyDetailComponent],
})
export class HistoryModule { }
