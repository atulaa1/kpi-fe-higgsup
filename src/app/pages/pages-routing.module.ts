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
import {SeminarComponent} from './seminar/seminar.component';
import {EventTeambuildingComponent} from './event-teambuilding/event-teambuilding.component';
import {HistoryComponent} from './history/history.component';

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
      path: 'seminar',
      component: SeminarComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'event-teambuilding',
      component: EventTeambuildingComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'man-history',
      component: HistoryComponent,
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
