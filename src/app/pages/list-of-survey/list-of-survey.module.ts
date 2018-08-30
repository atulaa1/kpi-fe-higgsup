import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListOfSurveyComponent} from './list-of-survey.component';
import { PersonalSurveyComponent } from './modal-kscn/modal-kscn.component';
import { SeminarSurveyComponent } from './kssml/kssml.component';
import {FormsModule} from '@angular/forms';
import {ThemeModule} from "../../@theme/theme.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [ListOfSurveyComponent, PersonalSurveyComponent, SeminarSurveyComponent ],
  entryComponents: [PersonalSurveyComponent, SeminarSurveyComponent],
})
export class ListOfSurveyModule { }
