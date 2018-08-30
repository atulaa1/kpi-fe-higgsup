import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SeminarComponent} from './seminar/seminar.component';
import {ClubComponent} from './club/club.component';
import {TeamBuildingComponent} from './team-building/team-building.component';
import {SupportComponent} from './support/support.component';
import {ActivitiesService} from '../../../@core/services/activities.service';
import {Activity} from '../../../@core/models/activity.model';
import {Group} from '../../../@core/models/group.model';
import {CreatedActivity} from '../../../@core/models/createdActivity.model';


@Component({
  selector: 'ngx-create-acti',
  templateUrl: './create-acti.component.html',
  styleUrls: ['./create-acti.component.scss'],
})
export class CreateActiComponent implements OnInit {
  listActivities: Array<Activity>;
  group = new Group<CreatedActivity>();
  groupList: Array<Group<CreatedActivity>>;


  constructor(private modalService: NgbModal, private activitiesService: ActivitiesService) {
  }

  ngOnInit() {
    this.activitiesService.getListActivities().subscribe(response => {
      if (response.status_code === 200) {
        this.listActivities = response.data;
      }
    });
    this.activitiesService.getCreatedActivity().subscribe(response => {
      if (response.status_code === 200) {
        this.groupList = response.data;
      }
    });
  }

  openActivityModal(idGroup) {
    if (idGroup === 1) {
      this.modalService.open(SeminarComponent, {backdrop: 'static', centered: true});
    } else if (idGroup === 2) {
      this.modalService.open(ClubComponent, {backdrop: 'static', centered: true});
    } else if (idGroup === 3) {
      this.modalService.open(TeamBuildingComponent,{backdrop: 'static', centered: true});
    } else if (idGroup === 4) {
      this.modalService.open(SupportComponent,{backdrop: 'static', centered: true});
    }
  }

  open(content) {
    this.modalService.open(content);
  }

  onChange(change: any) {
    this.activitiesService.getCreatedActivity().subscribe(response => {
      this.groupList = response.data;
    })
  }

}
