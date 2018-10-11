import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {ActiManagementModule} from './acti-management/acti-management.module';
import {ListOfSurveyModule} from './list-of-survey/list-of-survey.module';
import {AccManagementsModule} from './acc-managements/acc-managements.module';
import {ProjectmanagementModule} from './projectmanagement/projectmanagement.module';
import {ActivitiesModule} from './activities/activities.module';
import {SeminarModule} from './seminar/seminar.module';
import {EventTeambuildingModule} from './event-teambuilding/event-teambuilding.module';
import {HistoryModule} from './history/history.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    ActiManagementModule,
    ListOfSurveyModule,
    AccManagementsModule,
    ProjectmanagementModule,
    AccManagementsModule,
    ActivitiesModule,
    SeminarModule,
    EventTeambuildingModule,
    HistoryModule,

  ],
  declarations: [
    ...PAGES_COMPONENTS],
  entryComponents: [],
})
export class PagesModule {
}
