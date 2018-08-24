import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {ActiManagementModule} from './acti-management/acti-management.module';
import { AccManagementComponent } from './acc-management/acc-management.component';
import {AskSaveComponent} from './acc-management/ask-save/ask-save.component';

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
    AskSaveComponent,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    AccManagementComponent,
  ],
})
export class PagesModule {
}
