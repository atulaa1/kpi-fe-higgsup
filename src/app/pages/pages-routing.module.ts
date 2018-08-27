import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ActiManagementComponent} from './acti-management/acti-management.component';
import {CreateActiComponent} from './acti-management/create-acti/create-acti.component';
import {ConfirmActiComponent} from './acti-management/confirm-acti/confirm-acti.component';
import {AccManagementComponent} from './acc-management/acc-management.component';
import {AskSaveComponent} from './acc-management/ask-save/ask-save.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'acc-management',
      component: AccManagementComponent,
      // children: [
      //   {
      //   path: 'ask-save',
      //   component: AskSaveComponent,
      //   pathMatch: 'full',
      //   },
      // ],
    },
    {
      path: 'acti-management',
      component: ActiManagementComponent,
      children: [
        {
          path: 'create-acti',
          component: CreateActiComponent,
        },
        {
          path: '',
          redirectTo: 'create-acti',
          pathMatch: 'full',
        },
        {
          path: 'confirm-acti',
          component: ConfirmActiComponent,
        },
      ],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
