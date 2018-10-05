import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeambuildingActivityComponent} from './teambuilding-activity/teambuilding-activity.component';
import {EventTeambuildingComponent} from './event-teambuilding.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TeambuildingActivityComponent, EventTeambuildingComponent],
  entryComponents: [TeambuildingActivityComponent],
})
export class EventTeambuildingModule { }
