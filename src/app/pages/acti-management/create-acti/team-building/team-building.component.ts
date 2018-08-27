import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TeambuildingService} from '../../../../@core/services/teambuilding.service';
import {Group} from '../../../../@core/models/group.model';
import {CreatedActivity} from '../../../../@core/models/createdActivity.model';
import {Activity} from '../../../../@core/models/activity.model';

declare let swal: any;

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
  @Output() onChange = new EventEmitter<any>();
  constructor(private activeModal: NgbActiveModal, private teambuildingService: TeambuildingService) {
  }


  onClose() {
    this.activeModal.close();
  }

  onAddTeambuilding(addNew: any) {
    let point = new CreatedActivity();
    const groupType = new Activity();
    point  = this.createdActivity;
    groupType.id = 3;
    this.teambuilding.groupTypeId = groupType;
    this.teambuilding.additionalConfig = point;
    this.teambuilding.name = this.activityName;
    return this.teambuildingService.addTeambuilding(this.teambuilding).subscribe(response => {
      if (response.status_code === 200) {
        this.onChange.emit(addNew);
        this.activeModal.close();
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

  onUpdateTeambuilding(update: any) {
    let point = new CreatedActivity();
    const groupType = new Activity();
    point  = this.createdActivity;
    groupType.id = 3;
    this.teambuilding.groupTypeId = groupType;
    this.teambuilding.additionalConfig = point;
    this.teambuilding.name = this.activityName;
    this.teambuilding.id = this.groupId;
    return this.teambuildingService.updateTeambuilding(this.teambuilding).subscribe(response => {
      if (response.status_code === 200) {
        this.onChange.emit(update);
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

  ngOnInit() {
  }
}
