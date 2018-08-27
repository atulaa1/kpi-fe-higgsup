import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AskSaveComponent} from './ask-save/ask-save.component';
import {AccManagementComponent} from './acc-management.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
<<<<<<< HEAD
=======
    FormsModule,
>>>>>>> b64c0b6f13ced3ad22866afbf3b5699f8898894c
  ],
  declarations: [AccManagementComponent, AskSaveComponent],
  entryComponents: [AccManagementComponent],
})
export class AccManagementModule { }
