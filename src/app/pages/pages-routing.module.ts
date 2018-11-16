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
import {PointForUsersComponent} from './point-for-users/point-for-users.component';
import {AdminGuard} from '../@core/security/AdminGuard';
import {ManGuard} from '../@core/security/ManGuard';
import {MemberGuard} from '../@core/security/MemberGuard';
import {AuthorizationGuard} from '../@core/security/AuthorizationGuard';

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
      canActivate: [AuthGuard, AuthorizationGuard],
      data: {roles: ['ADMIN']},
    },
    {
      path: 'acti-management',
      component: ActiManagementComponent,
      canActivate: [AuthGuard, AuthorizationGuard],
      data: {roles: ['ADMIN']},
    },
    {
      path: 'project-management',
      component: ProjectmanagementComponent,
      canActivate: [AuthGuard, AuthorizationGuard],
      data: {roles: ['ADMIN']},
    },
    {
      path: 'listofsurvey',
      component: ListOfSurveyComponent,
      canActivate: [AuthGuard, AuthorizationGuard],
      data: {roles: ['ADMIN']},
    },
    {
      path: 'creating-activities',
      component: ActivitiesComponent,
      canActivate: [AuthGuard, AuthorizationGuard],
      data: {roles: ['MAN', 'EMPLOYEE']},
    },
    {
      path: 'man-survey',
      component: ManSurveyComponent,
      canActivate: [AuthGuard, AuthorizationGuard],
      data: {roles: ['MAN']},
    },
    {
      path: 'employee-seminar-survey',
      component: EmployeeSeminarSurveyComponent,
      canActivate: [AuthGuard, AuthorizationGuard],
      data: {roles: ['EMPLOYEE']},
    },
    {
      path: 'event-teambuilding',
      component: EventTeambuildingComponent,
      canActivate: [AuthGuard, AuthorizationGuard],
      data: {roles: ['ADMIN']},
    },
    {
      path: 'point-for-user',
      component: PointForUsersComponent,
      canActivate: [AuthGuard, AuthorizationGuard],
      data: {roles: ['EMPLOYEE']},
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
