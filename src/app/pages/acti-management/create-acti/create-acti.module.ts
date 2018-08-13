import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeminarComponent } from './seminar/seminar.component';
import { ClubComponent } from './club/club.component';
import { TeamBuildingComponent } from './team-building/team-building.component';
import { SupportComponent } from './support/support.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ClubComponent, TeamBuildingComponent, SupportComponent],
  imports: [
    CommonModule,
    NgbModalModule,
  ],
})
export class CreateActiModule { }
