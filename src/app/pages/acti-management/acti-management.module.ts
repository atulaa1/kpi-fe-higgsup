import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActiManagementComponent} from './acti-management.component';
import {CreateActiComponent} from './create-acti/create-acti.component';
import {ConfirmActiComponent} from './confirm-acti/confirm-acti.component';
import {ActiManagementRoutingModule} from './acti-management-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
import {SeminarComponent} from './create-acti/seminar/seminar.component';
import {ClubComponent} from './create-acti/club/club.component';
import {TeamBuildingComponent} from './create-acti/team-building/team-building.component';
import {SupportComponent} from './create-acti/support/support.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TwoDigitDecimaNumberDirective} from '../../@core/directives/regex.directive';
import {ActivitiesModule} from '../activities/activities.module';
import {ClubActivityComponent} from '../activities/club-activity/club-activity.component';

@NgModule({
  imports: [
    CommonModule,
    ActiManagementRoutingModule,
    ThemeModule,
    ActivitiesModule
  ],
  declarations: [ActiManagementComponent, CreateActiComponent, ConfirmActiComponent, SeminarComponent, ClubComponent,
    TeamBuildingComponent, SupportComponent, TwoDigitDecimaNumberDirective],
  entryComponents: [SeminarComponent, ClubComponent, TeamBuildingComponent, SupportComponent, ClubActivityComponent],
  providers: [NgbActiveModal],
})
export class ActiManagementModule {
}
