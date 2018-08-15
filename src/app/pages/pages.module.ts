import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {ActiManagementModule} from './acti-management/acti-management.module';
import { NotificationComponent } from './notification/notification.component';


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
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    NotificationComponent,
  ],
})
export class PagesModule {
}
