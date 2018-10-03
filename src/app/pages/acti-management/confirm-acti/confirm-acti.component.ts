import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ClubActivityComponent} from '../../activities/club-activity/club-activity.component';
import {ActivitiesConfirmService} from '../../../@core/services/activities-confirm.service';
import {SeminarComponent} from '../create-acti/seminar/seminar.component';
import {ClubComponent} from '../create-acti/club/club.component';
import {TeamBuildingComponent} from '../create-acti/team-building/team-building.component';
import {SupportComponent} from '../create-acti/support/support.component';
import {SupportActivityComponent} from '../../activities/support-activity/support-activity.component';
import {CreatedActivity} from '../../../@core/models/createdActivity.model';


@Component({
  selector: 'confirm-acti',
  templateUrl: './confirm-acti.component.html',
  styleUrls: ['./confirm-acti.component.scss']
})
export class ConfirmActiComponent implements OnInit {
  listActivities: any;
  listActivitiesClone: any;
  @Input() dismiss;
  message: string;
  nameSearch: string;
  showMsg: boolean = false;

  constructor(private modalService: NgbModal,
              private activitiesConfirm: ActivitiesConfirmService) {
  }

  ngOnInit() {
    this.activitiesConfirm.getListActivitiesConfirm().subscribe(response => {
      this.listActivities = response.data;
      this.listActivitiesClone = Object.assign(this.listActivities);

    })
  }

  open(content) {
    this.modalService.open(content, {backdrop: 'static', centered: true, size: 'lg'});
  }

  onChange($event) {
    this.activitiesConfirm.getListActivitiesConfirm().subscribe(response => {
      if (response.status_code === 200) {
        this.listActivities = response.data;
      }
    });
  }


  searchConfirmActi() {
    /*  this.listActivities = Object.assign(this.listActivitiesClone);*/
    this.listActivities = this.listActivities.forEach(function (value) {
      if (value.status === 1) {
        console.log("all");
      } else if (value.status === 2) {
        console.log('chưa xác nhận')
      } else if (value.status === 3) {
        console.log('đã hủy')
      }
    });
  }

  closeModal() {
    this.dismiss();
  }
}
