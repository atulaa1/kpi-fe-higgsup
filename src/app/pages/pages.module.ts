import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {ActiManagementModule} from './acti-management/acti-management.module';
import {ProjectmanagementComponent} from './projectmanagement/projectmanagement.component';
import {AccManagementModule} from './acc-management/acc-management.module';
import {ListOfSurveyModule} from './list-of-survey/list-of-survey.module';
import {DialogConfirmationComponent} from '../modals/dialog-confirmation/dialog-confirmation.component';

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
    AccManagementModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ProjectmanagementComponent, DialogConfirmationComponent,
  ],
  entryComponents: [DialogConfirmationComponent],
})
export class PagesModule {
}
