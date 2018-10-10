
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {ProjectManagementConfirmComponent} from './project-management-confirm/project-management-confirm.component';
import {MatFormFieldModule, MatIconModule, MatOptionModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {ProjectmanagementComponent} from './projectmanagement.component';
import {DialogConfirmationComponent} from '../../modals/dialog-confirmation/dialog-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatIconModule,
  ],
  declarations: [ProjectmanagementComponent, ProjectManagementConfirmComponent, DialogConfirmationComponent],
  entryComponents: [ProjectManagementConfirmComponent, DialogConfirmationComponent],
})
export class ProjectmanagementModule { }
