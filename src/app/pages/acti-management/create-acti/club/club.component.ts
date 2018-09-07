import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CreatedActivity} from '../../../../@core/models/createdActivity.model';
import {Group} from '../../../../@core/models/group.model';
import {Activity} from '../../../../@core/models/activity.model';
import {ClubService} from '../../../../@core/services/club.service';
import swal from 'sweetalert';
import {ActivitiesService} from '../../../../@core/services/activities.service';
import {DataService} from '../../../../@core/services/data.service';

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
  message: string;
  alert: boolean = false;

  constructor(private activeModal: NgbActiveModal, private clubService: ClubService, private activityService: ActivitiesService,
              private data: DataService) {
  }


  onAddClub(addNew: any) {
    const groupType = new Activity();
    groupType.id = 2;
    this.group.groupTypeId = groupType;
    this.group.additionalConfig = this.createdActivity;
    this.group.name = this.activityName;
    if (this.group.name === ''
      || !this.group.additionalConfig.host
      || !this.group.additionalConfig.minNumberOfSessions
      || !this.group.additionalConfig.participationPoint
      || !this.group.additionalConfig.effectivePoint) {
      this.alert = true;
    } else {
      this.alert = false;
      return this.clubService.addClub(this.group).subscribe(response => {
        if (response.status_code === 200) {
          this.activeModal.close();
          this.data.changeMessage('Created new an activity');
          swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
        } else if (response.status_code === 906) {
          swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
        } else if (response.status_code === 903) {
          swal('Thông báo!', 'Tên CLB không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'parameter point is not valid') {
          swal('Thông báo!', 'Số điểm không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'parameter min number of sessions is not valid') {
          swal('Thông báo!', 'Số buổi đăng kí không hợp lệ!', 'error');
        } else if (response.status_code === 900) {
          swal('Thông báo!', 'Loại hoạt động không tồn tại!', 'error');
        } else if (response.status_code === 932) {
          swal('Thông báo!', 'Câu lạc bộ đã tồn tại!', 'error');
        }
      })
    }
  }

  onUpdateClub(update: any) {
    const groupType = new Activity();
    groupType.id = 2;
    this.group.groupTypeId = groupType;
    this.group.additionalConfig = this.createdActivity;
    this.group.name = this.activityName;
    this.group.id = this.groupId;
    if (this.group.name === ''
      || !this.group.additionalConfig.host
      || !this.group.additionalConfig.minNumberOfSessions
      || !this.group.additionalConfig.participationPoint
      || !this.group.additionalConfig.effectivePoint) {
      this.alert = true;
    } else {
      this.alert = false;
      return this.clubService.updateClub(this.group.id, this.group).subscribe(response => {
        if (response.status_code === 200) {
          this.change.emit(update);
          this.dismiss();
          return swal('Chúc Mừng!', 'Đã sửa thành công!', 'success');
        } else if (response.status_code === 906) {
          return swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
        } else if (response.status_code === 903) {
          return swal('Thông báo!', 'Tên CLB không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'parameter point is not valid') {
          swal('Thông báo!', 'Số điểm không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'parameter min number of sessions is not valid') {
          swal('Thông báo!', 'Số buổi đăng kí không hợp lệ!', 'error');
        } else if (response.status_code === 900 && response.message === 'group type does not exist') {
          swal('Thông báo!', 'Loại hoạt động không tồn tại!', 'error');
        } else if (response.status_code === 900 && response.message === 'not find') {
          swal('Thông báo!', 'Không tìm thấy hoạt động để cập nhật!', 'error');
        }
      })
    }
  }

  getCreatedActivities() {
    this.activityService.getCreatedActivity().subscribe(response => {
      if (response.status_code === 200) {
        this.listActivities = response.data;
      }
    })
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }


  onClose() {
    this.activeModal.close();
  }
}
