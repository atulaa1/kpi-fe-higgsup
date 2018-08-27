import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {ActiManagementModule} from './acti-management/acti-management.module';
<<<<<<< HEAD
import { AccManagementComponent } from './acc-management/acc-management.component';
import {AccManagementModule} from './acc-management/acc-management.module';
=======
import {AccManagementModule} from './acc-management/acc-management.module';
import { ProjectmanagementComponent } from './projectmanagement/projectmanagement.component';
import {ListOfSurveyModule} from './list-of-survey/list-of-survey.module';

>>>>>>> b64c0b6f13ced3ad22866afbf3b5699f8898894c
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
<<<<<<< HEAD
    AccManagementModule,
    // AccManagementComponent
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    AccManagementComponent
  ]
=======
    ListOfSurveyModule,
    AccManagementModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ProjectmanagementComponent,
  ],
>>>>>>> b64c0b6f13ced3ad22866afbf3b5699f8898894c
})
export class PagesModule {
}
