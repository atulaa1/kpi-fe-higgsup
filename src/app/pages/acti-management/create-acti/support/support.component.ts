import {Component, Input, OnInit} from '@angular/core';
import {CreatedActivity} from '../../../../@core/models/createdActivity.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SupportService} from '../../../../@core/services/support.service';
import {Group} from '../../../../@core/models/group.model';
import {Activity} from '../../../../@core/models/activity.model';
import swal from 'sweetalert';

@Component({
  selector: 'ngx-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {
  @Input() createdActivity: CreatedActivity = new CreatedActivity();
  @Input() activityName: string = '';
  @Input() groupId: number  = null;
  @Input() dismiss;
  group =  new Group<CreatedActivity>();
  constructor(private activeModal: NgbActiveModal,
              private supportService: SupportService) {}


  addSupport() {
    let point = new CreatedActivity();
    const groupType = new Activity();
    point  = this.createdActivity;
    groupType.id = 4; // 4 is support
    this.group.groupTypeId = groupType;
    this.group.additionalConfig = point;
    this.group.name = this.activityName;
    return this.supportService.createSupport(this.group).subscribe(response => {
      if (response.status_code === 200) {
        this.group = response;
        this.activeModal.close();
        swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
      }
      else if (response.status_code === 906) {
        swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
      }
    })
  }

  changeSupport(){
    let point = new CreatedActivity();
    const groupType = new Activity();
    point  = this.createdActivity;
    groupType.id = 4; // 4 is support
    this.group.groupTypeId = groupType;
    this.group.additionalConfig = point;
    this.group.name = this.activityName;
    return this.supportService.uppdateSuport(this.group).subscribe(response => {
      if (response.status_code === 200) {
        this.group = response;
        this.dismiss();
        swal('Chúc Mừng!', 'Đã sửa thành công!', 'success');
      }
      else if (response.status_code === 906) {
        swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
      }
    })
  }
  ngOnInit() {
  }

  onClose() {
    this.activeModal.close();
  }
}
