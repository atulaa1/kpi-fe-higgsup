import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ActiManagementComponent} from './acti-management/acti-management.component';
import {CreateActiComponent} from './acti-management/create-acti/create-acti.component';
import {ConfirmActiComponent} from './acti-management/confirm-acti/confirm-acti.component';
import {ProjectmanagementComponent} from './projectmanagement/projectmanagement.component';
import {ListOfSurveyComponent} from "./list-of-survey/list-of-survey.component";

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
    {
      path: 'project-management',
      component: ProjectmanagementComponent,
    },
    {
      path: 'listofsurvey',
      component: ListOfSurveyComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
