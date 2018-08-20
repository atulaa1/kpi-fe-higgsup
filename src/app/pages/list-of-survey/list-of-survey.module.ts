import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListOfSurveyComponent} from './list-of-survey.component';
import { ModalKscnComponent } from './modal-kscn/modal-kscn.component';
import { KssmlComponent } from './kssml/kssml.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [ListOfSurveyComponent, ModalKscnComponent, KssmlComponent ],
})
export class ListOfSurveyModule { }
