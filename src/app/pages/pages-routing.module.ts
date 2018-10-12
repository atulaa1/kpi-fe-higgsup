import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ActiManagementComponent} from './acti-management/acti-management.component';
import {ProjectmanagementComponent} from './projectmanagement/projectmanagement.component';
import {ListOfSurveyComponent} from './list-of-survey/list-of-survey.component';
import {AccManagementsComponent} from './acc-managements/acc-managements.component';
import {AuthGuard} from '../@core/services/auth.guard';
import {ActivitiesComponent} from './activities/activities.component';
import {EmployeeSeminarSurveyComponent} from './employee-seminar-survey/employee-seminar-survey.component';
import {EventTeambuildingComponent} from './event-teambuilding/event-teambuilding.component';
import {ManSurveyComponent} from './man-survey/man-survey.component';

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
    {
      path: 'man-survey',
      component: ManSurveyComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'employee-seminar-survey',
      component: EmployeeSeminarSurveyComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'event-teambuilding',
      component: EventTeambuildingComponent,
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
