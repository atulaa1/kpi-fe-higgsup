import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccManagementsComponent} from './acc-managements.component';
import {AccManagementComponent} from './acc-management/acc-management.component';
import {FormsModule} from '@angular/forms';
import {AskSaveComponent} from './acc-management/ask-save/ask-save.component';
import {RouterModule} from '@angular/router';
import { AccManagementLateComponent } from './acc-management-late/acc-management-late.component';
import { AccInfoComponent } from './acc-management/acc-info/acc-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [AccManagementsComponent, AccManagementComponent, AskSaveComponent, AccManagementLateComponent, AccInfoComponent],
  entryComponents: [AccManagementsComponent],
})
export class AccManagementsModule { }
