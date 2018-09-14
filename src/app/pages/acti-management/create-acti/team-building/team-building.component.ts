import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TeambuildingService} from '../../../../@core/services/teambuilding.service';
import {Group} from '../../../../@core/models/group.model';
import {CreatedActivity} from '../../../../@core/models/createdActivity.model';
import {Activity} from '../../../../@core/models/activity.model';
import swal from 'sweetalert';
import {DataService} from '../../../../@core/services/data.service';

@Component({
  selector: 'ngx-team-building',
  templateUrl: './team-building.component.html',
  styleUrls: ['./team-building.component.scss'],
})
export class TeamBuildingComponent implements OnInit {
  @Input() groupId: number = null;
  @Input() createdActivity: CreatedActivity = new CreatedActivity();
  @Input() activityName: string = '';
  @Input() dismiss;
  teambuilding = new Group<CreatedActivity>();
  message: string;
  alert: boolean = false;
  @Output() change = new EventEmitter<any>();

  constructor(private activeModal: NgbActiveModal, private teambuildingService: TeambuildingService,
              private data: DataService) {
  }


  onClose() {
    this.activeModal.close();
  }

  onAddTeambuilding(addNew: any) {
    let point = new CreatedActivity();
    const groupType = new Activity();
    point = this.createdActivity;
    groupType.id = 3;
    this.teambuilding.groupType = groupType;
    this.teambuilding.additionalConfig = point;
    this.teambuilding.name = this.activityName;
    if (this.teambuilding.name === ''
      || !this.teambuilding.additionalConfig.firstPrizePoint
      || !this.teambuilding.additionalConfig.secondPrizePoint
      || !this.teambuilding.additionalConfig.thirdPrizePoint
      || !this.teambuilding.additionalConfig.organizerPoint) {
      this.alert = true;
    } else {
      this.alert = false;
      return this.teambuildingService.addTeambuilding(this.teambuilding).subscribe(response => {
        if (response.status_code === 200) {
          this.activeModal.close();
          this.data.changeMessage('Created new an activity');
          swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
        } else if (response.status_code === 900) {
          swal('Thông báo!', 'Không tìm thấy loại hoạt động!', 'error');
        } else if (response.status_code === 932) {
          swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
        } else if (response.status_code === 931 && response.message === 'The first prize score can not be null') {
          swal('Thông báo!', 'Điểm của giải Nhất không được để trống!', 'error');
        } else if (response.status_code === 931 && response.message === 'The second prize score can not be null') {
          swal('Thông báo!', 'Điểm của giải Nhì không được để trống!', 'error');
        } else if (response.status_code === 931 && response.message === 'The third prize score can not be null') {
          swal('Thông báo!', 'Điểm của giải Ba không được để trống!', 'error');
        } else if (response.status_code === 931 && response.message === 'The orgnizers score can not be null') {
          swal('Thông báo!', 'Điểm của Ban Tổ chức không được để trống!', 'error');
        } else if (response.status_code === 901 && response.message === 'Invalidated first prize') {
          swal('Thông báo!', 'Điểm của giải Nhất không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'Invalidated second  prize') {
          swal('Thông báo!', 'Điểm của giải Nhì không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'Invalidated third prize') {
          swal('Thông báo!', 'Điểm của giải Ba không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'Invalidated orgnizers prize') {
          swal('Thông báo!', 'Điểm của Ban Tổ chức không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'first prize score has to large than second prize score') {
          swal('Thông báo!', 'Điểm của giải Nhất phải lớn hơn điểm của giải Nhì!', 'error');
        } else if (response.status_code === 901 && response.message === 'second prize score has to large than third prize score') {
          swal('Thông báo!', 'Điểm của giải Nhì phải lớn hơn điểm của giải Ba!', 'error');
        }
      });
    }
  }

  onUpdateTeambuilding(update: any) {
    let point = new CreatedActivity();
    const groupType = new Activity();
    point = this.createdActivity;
    groupType.id = 3;
    this.teambuilding.groupType = groupType;
    this.teambuilding.additionalConfig = point;
    this.teambuilding.name = this.activityName;
    this.teambuilding.id = this.groupId;
    if (this.teambuilding.name === ''
      || !(this.teambuilding.additionalConfig.firstPrizePoint === 0 || this.teambuilding.additionalConfig.firstPrizePoint)
      || !(this.teambuilding.additionalConfig.secondPrizePoint === 0 || this.teambuilding.additionalConfig.secondPrizePoint)
      || !(this.teambuilding.additionalConfig.thirdPrizePoint === 0 || this.teambuilding.additionalConfig.thirdPrizePoint)
      || !(this.teambuilding.additionalConfig.organizerPoint === 0 || this.teambuilding.additionalConfig.organizerPoint)) {
      this.alert = true;
    } else {
      this.alert = false;
      return this.teambuildingService.updateTeambuilding(this.groupId, this.teambuilding).subscribe(response => {
        if (response.status_code === 200) {
          this.change.emit(update);
          this.dismiss();
          swal('Chúc Mừng!', 'Đã sửa thành công!', 'success');
        } else if (response.status_code === 906) {
          swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
        } else if (response.status_code === 900) {
          swal('Thông báo!', 'Không tìm thấy loại hoạt động!', 'error');
        } else if (response.status_code === 932) {
          swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
        } else if (response.status_code === 931 && response.message === 'The first prize score can not be null') {
          swal('Thông báo!', 'Điểm của giải Nhất không được để trống!', 'error');
        } else if (response.status_code === 931 && response.message === 'The second prize score can not be null') {
          swal('Thông báo!', 'Điểm của giải Nhì không được để trống!', 'error');
        } else if (response.status_code === 931 && response.message === 'The third prize score can not be null') {
          swal('Thông báo!', 'Điểm của giải Ba không được để trống!', 'error');
        } else if (response.status_code === 931 && response.message === 'The orgnizers score can not be null') {
          swal('Thông báo!', 'Điểm của Ban Tổ chức không được để trống!', 'error');
        } else if (response.status_code === 901 && response.message === 'Invalidated first prize') {
          swal('Thông báo!', 'Điểm của giải Nhất không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'Invalidated second  prize') {
          swal('Thông báo!', 'Điểm của giải Nhì không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'Invalidated third prize') {
          swal('Thông báo!', 'Điểm của giải Ba không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'Invalidated orgnizers prize') {
          swal('Thông báo!', 'Điểm của Ban Tổ chức không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'first prize score has to large than second prize score') {
          swal('Thông báo!', 'Điểm của giải Nhất phải lớn hơn điểm của giải Nhì!', 'error');
        } else if (response.status_code === 901 && response.message === 'second prize score has to large than third prize score') {
          swal('Thông báo!', 'Điểm của giải Nhì phải lớn hơn điểm của giải Ba!', 'error');
        }
      })
    }
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }
}
