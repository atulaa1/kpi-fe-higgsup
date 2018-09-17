import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ActiManagementComponent} from './acti-management/acti-management.component';
import {CreateActiComponent} from './acti-management/create-acti/create-acti.component';
import {ConfirmActiComponent} from './acti-management/confirm-acti/confirm-acti.component';
import {ProjectmanagementComponent} from './projectmanagement/projectmanagement.component';
import {ListOfSurveyComponent} from './list-of-survey/list-of-survey.component';
import {AccManagementComponent} from './acc-managements/acc-management/acc-management.component';
import {AccManagementsComponent} from './acc-managements/acc-managements.component';
import {AccManagementLateComponent} from './acc-managements/acc-management-late/acc-management-late.component';
import {AuthGuard} from '../@core/services/auth.guard';
import {ActivitiesComponent} from './activities/activities.component';

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
      path: 'acc-managements',
      component: AccManagementsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'acti-management',
      component: ActiManagementComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'project-management',
      component: ProjectmanagementComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'listofsurvey',
      component: ListOfSurveyComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'creating-activities',
      component: ActivitiesComponent,
      canActivate: [AuthGuard],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
