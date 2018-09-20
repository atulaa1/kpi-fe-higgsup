import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatingActivitiesComponent } from './creating-activities/creating-activities.component';
import { CreatedActivitiesComponent } from './created-activities/created-activities.component';
import {ActivitiesComponent} from './activities.component';
import {ThemeModule} from '../../@theme/theme.module';
import { ClubActivityComponent } from './club-activity/club-activity.component';
import { SeminarActivityComponent } from './seminar-activity/seminar-activity.component';
import { SupportActivityComponent } from './support-activity/support-activity.component';
import {MatFormFieldModule, MatIconModule} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatOptionModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatIconModule,
  ],
  declarations: [CreatingActivitiesComponent, CreatedActivitiesComponent, ActivitiesComponent, ClubActivityComponent,
    SeminarActivityComponent, SupportActivityComponent],
})
export class ActivitiesModule { }
