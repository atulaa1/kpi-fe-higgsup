import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeambuildingActivityComponent} from './teambuilding-activity/teambuilding-activity.component';
import {EventTeambuildingComponent} from './event-teambuilding.component';
import {ThemeModule} from '../../@theme/theme.module';
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
  declarations: [TeambuildingActivityComponent, EventTeambuildingComponent],
  entryComponents: [TeambuildingActivityComponent],
})
export class EventTeambuildingModule { }
