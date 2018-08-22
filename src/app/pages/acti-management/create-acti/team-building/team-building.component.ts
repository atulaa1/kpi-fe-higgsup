import {Component, Input, OnInit} from '@angular/core';
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
  @Input() activity: Group<CreatedActivity>;
  @Input() createdActivity: CreatedActivity = new CreatedActivity();
  @Input() activityName: string = '';
  @Input() dismiss;
  teambuilding = new Group<CreatedActivity>();
  point = new CreatedActivity();
  groupType = new Activity();

  constructor(private activeModal: NgbActiveModal, private teambuildingService: TeambuildingService) {
  }

  ngOnInit() {
    if (this.activityName !== '') {
      this.teambuilding = this.activity;
      this.point = this.teambuilding.additionalConfig;
    }
  }

  onClose() {
    this.activeModal.close();
  }

  onAddTeambuilding() {
    this.groupType.id = 3;
    this.teambuilding.groupTypeId = this.groupType;
    this.teambuilding.additionalConfig = this.point;
    return this.teambuildingService.addTeambuilding(this.teambuilding).subscribe(response => {
      if (response.status_code === 200) {
        swal('Đã tạo!', 'Bạn đã tạo thành công!', 'success');
        this.activeModal.close();
      }
    });
  }

  onUpdateTeambuilding() {
    this.teambuilding.additionalConfig = this.point;
    return this.teambuildingService.updateTeambuilding(this.teambuilding).subscribe(response => {
      if (response.status_code === 200) {
        swal('Đã sửa!', 'Bạn đã sửa hoạt động', 'success');
        window.location.reload();
      }
    });
  }
}
