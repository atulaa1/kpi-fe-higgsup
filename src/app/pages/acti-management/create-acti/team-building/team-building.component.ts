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
  @Input() groupId: number;
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
    this.teambuilding.groupTypeId = groupType;
    this.teambuilding.additionalConfig = point;
    this.teambuilding.name = this.activityName;
    if (this.teambuilding.name === ''
      || this.teambuilding.additionalConfig.firstPrize === null
      || this.teambuilding.additionalConfig.secondPrize === null
      || this.teambuilding.additionalConfig.thirdPrize === null
      || this.teambuilding.additionalConfig.organizers === null) {
      this.alert = true;
    } else {
      this.alert = false;
      return this.teambuildingService.addTeambuilding(this.teambuilding).subscribe(response => {
        if (response.status_code === 200) {
          this.activeModal.close();
          this.data.changeMessage('Created new an activity');
          swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
        } else if (response.status_code === 906) {
          swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
        } else if (response.status_code === 900) {
          swal('Thông báo!', 'Không tìm thấy loại hoạt động!', 'error');
        } else if (response.status_code === 932) {
          swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
        } else if (response.status_code === 931) {
          swal('Thông báo!', 'Điểm của giải Nhất không được để trống!', 'error');
        }
      });
    }
  }

  onUpdateTeambuilding(update: any) {
    let point = new CreatedActivity();
    const groupType = new Activity();
    point = this.createdActivity;
    groupType.id = 3;
    this.teambuilding.groupTypeId = groupType;
    this.teambuilding.additionalConfig = point;
    this.teambuilding.name = this.activityName;
    this.teambuilding.id = this.groupId;
    if (this.teambuilding.name === ''
      || this.teambuilding.additionalConfig.firstPrize.toString() === ''
      || this.teambuilding.additionalConfig.secondPrize.toString() === ''
      || this.teambuilding.additionalConfig.thirdPrize.toString() === ''
      || this.teambuilding.additionalConfig.organizers.toString() === '') {
      this.alert = true;
    } else {
      this.alert = false;
      return this.teambuildingService.updateTeambuilding(this.teambuilding).subscribe(response => {
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
        } else if (response.status_code === 931) {
          swal('Thông báo!', 'Điểm của giải Nhất không được để trống!', 'error');
        }
      })
    }
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }
}
