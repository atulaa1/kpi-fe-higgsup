import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AskSaveComponent} from './ask-save/ask-save.component';
import {AccManagementComponent} from './acc-management.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [AccManagementComponent, AskSaveComponent],
  entryComponents: [AccManagementComponent],
})
export class AccManagementModule { }
