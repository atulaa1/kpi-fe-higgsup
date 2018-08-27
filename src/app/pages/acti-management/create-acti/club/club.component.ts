import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CreatedActivity} from '../../../../@core/models/createdActivity.model';
import {Group} from '../../../../@core/models/group.model';
import {Activity} from '../../../../@core/models/activity.model';
import {ClubService} from '../../../../@core/services/club.service';
import swal from 'sweetalert';
import {ActivitiesService} from '../../../../@core/services/activities.service';

@Component({
  selector: 'ngx-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubComponent implements OnInit {
  @Input() createdActivity: CreatedActivity = new CreatedActivity();
  @Input() activityName: string = '';
  @Input() dismiss;
  @Input() groupId: number = null;
  group = new Group<CreatedActivity>();
  listActivities: Array<Activity>;

  constructor(private activeModal: NgbActiveModal, private clubService: ClubService, private activityService: ActivitiesService) {
  }


  onAddClub() {
    const groupType = new Activity();
    groupType.id = 2;
    this.group.groupTypeId = groupType;
    this.group.additionalConfig = this.createdActivity;
    this.group.name = this.activityName;
    return this.clubService.addClub(this.group).subscribe(response => {
      if (response.status_code === 200) {
        this.activeModal.close();
        this.getCreatedActivities();

         swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
      }
      else if (response.status_code === 906) {
         swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
      }
      else if (response.status_code === 906) {
        swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
      }
    })
  }

  onUpdateClub() {
    const groupType = new Activity();
    groupType.id = 2;
    this.group.groupTypeId = groupType;
    this.group.additionalConfig = this.createdActivity;
    this.group.name = this.activityName;
    this.group.id = this.groupId;
    return this.clubService.updateClub(this.group.id, this.group).subscribe(response => {
      if (response.status_code === 200) {
        this.getCreatedActivities();
        this.dismiss();
        return swal('Chúc Mừng!', 'Đã sửa thành công!', 'success');
      }
      else if (response.status_code === 906) {
        return swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
      }
    })
  }
  getCreatedActivities() {
    this.activityService.getCreatedActivity().subscribe(response => {
      if (response.status_code === 200) {
        this.listActivities = response.data;
      }
    })
  }
  ngOnInit() {

  }

  onClose() {
    this.activeModal.close();
  }
}
