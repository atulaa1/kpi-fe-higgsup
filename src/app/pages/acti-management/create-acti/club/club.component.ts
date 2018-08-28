import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() change = new EventEmitter<any>();
  constructor(private activeModal: NgbActiveModal, private clubService: ClubService, private activityService: ActivitiesService) {
  }


  onAddClub(addNew: any) {
    const groupType = new Activity();
    groupType.id = 2;
    this.group.groupTypeId = groupType;
    this.group.additionalConfig = this.createdActivity;
    this.group.name = this.activityName;
    return this.clubService.addClub(this.group).subscribe(response => {
      if (response.status_code === 200) {
        this.activeModal.close();

         swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
      }
      else if (response.status_code === 906) {
         swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
      }
      else if (response.status_code === 903) {
        swal('Thông báo!', 'Tên CLB không hợp lệ!', 'error');
      }
      else if (response.status_code === 901) {
        swal('Thông báo!', 'Số buổi hoặc điểm không hợp lệ!', 'error');
      }
      else if (response.status_code === 900) {
        swal('Thông báo!', 'Loại hoạt động không tồn tại!', 'error');
      }
      else if (response.status_code === 932) {
        swal('Thông báo!', 'Câu lạc bộ đã tồn tại!', 'error');
      }
    })
  }

  onUpdateClub(update: any) {
    const groupType = new Activity();
    groupType.id = 2;
    this.group.groupTypeId = groupType;
    this.group.additionalConfig = this.createdActivity;
    this.group.name = this.activityName;
    this.group.id = this.groupId;
    return this.clubService.updateClub(this.group.id, this.group).subscribe(response => {
      if (response.status_code === 200) {
        this.change.emit(update);
        this.dismiss();
        return swal('Chúc Mừng!', 'Đã sửa thành công!', 'success');
      }
      else if (response.status_code === 906) {
        return swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
      }
      else if (response.status_code === 903) {
        return swal('Thông báo!', 'Tên CLB không hợp lệ!', 'error');
      }
      else if (response.status_code === 901) {
        return swal('Thông báo!', 'Số điểm không hợp lệ!', 'error');
      }
      else if (response.status_code === 900) {
        return swal('Thông báo!', 'Loại hoạt động không tồn tại!', 'error');
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
