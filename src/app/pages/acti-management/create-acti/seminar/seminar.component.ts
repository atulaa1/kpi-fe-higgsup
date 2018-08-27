import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CreatedActivity} from '../../../../@core/models/createdActivity.model';
import {Group} from '../../../../@core/models/group.model';
import {SeminarService} from '../../../../@core/services/seminar.service';
import {Activity} from '../../../../@core/models/activity.model';
import swal from 'sweetalert';

@Component({
  selector: 'ngx-seminar',
  templateUrl: './seminar.component.html',
  styleUrls: ['./seminar.component.scss'],
})
export class SeminarComponent implements OnInit {

  @Input() createdActivity: CreatedActivity = new CreatedActivity();
  @Input() activityName: string = '';
  @Input() dismiss;
  @Input() groupId: number = null;
  seminarActivity = new Group<CreatedActivity>();

  constructor(private activeModal: NgbActiveModal, private seminarService: SeminarService) {
  }



  onAddSeminar() {
    const groupType = new Activity();
    groupType.id = 1;
    this.seminarActivity.groupTypeId = groupType;
    this.seminarActivity.additionalConfig = this.createdActivity;
    this.seminarActivity.name = this.activityName;
    return this.seminarService.addSeminar(this.seminarActivity).subscribe(response => {
      if (response.status_code === 200) {
        this.activeModal.close();
        swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
      }
      else if (response.status_code === 940) {
        swal('Thông báo!', 'Điểm của người phía dưới không được lớn hơn!', 'error');
      }
      else if (response.status_code === 901) {
        swal('Thông báo!', 'Điểm của Host không hợp lệ!', 'error');
      }

    })
  }

  onUpdateSeminar() {
    const groupType = new Activity();
    groupType.id = 1;
    this.seminarActivity.groupTypeId = groupType;
    this.seminarActivity.additionalConfig = this.createdActivity;
    this.seminarActivity.name = this.activityName;
    return this.seminarService.updateSeminar(this.groupId, this.seminarActivity).subscribe(response => {
      if (response.status_code === 200) {
        this.dismiss();
        return swal('Chúc Mừng!', 'Đã sửa thành công!', 'success');
      }
      else if (response.status_code === 906) {
        return swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
      }
    })
  }


  ngOnInit() {
  }
  onClose() {
    this.activeModal.close();
  }
}
