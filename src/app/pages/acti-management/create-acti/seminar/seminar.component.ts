import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CreatedActivity} from '../../../../@core/models/createdActivity.model';
import {Group} from '../../../../@core/models/group.model';
import {SeminarService} from '../../../../@core/services/seminar.service';
import {Activity} from '../../../../@core/models/activity.model';
import swal from 'sweetalert';
import {DataService} from '../../../../@core/services/data.service';

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
  @Output() change = new EventEmitter<any>();
  message: string;
  constructor(private activeModal: NgbActiveModal, private seminarService: SeminarService, private data: DataService) {
  }



  onAddSeminar(addNew: any) {
    const groupType = new Activity();
    groupType.id = 1;
    this.seminarActivity.groupTypeId = groupType;
    this.seminarActivity.additionalConfig = this.createdActivity;
    this.seminarActivity.name = this.activityName;
    return this.seminarService.addSeminar(this.seminarActivity).subscribe(response => {
      if (response.status_code === 200) {
        this.activeModal.close();
        this.data.changeMessage('Created new an activity');
        swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
      } else if (response.status_code === 940 && response.message === 'point host not larger than point member') {
        swal('Thông báo!', 'Điểm của thành viên không được lớn hơn hoặc bằng điểm của Host!', 'error');
      } else if (response.status_code === 940 && response.message === 'point member not larger than point listener') {
        swal('Thông báo!', 'Điểm của người dự thính không được lớn hơn hoặc bằng điểm của thành viên!', 'error');
      } else if (response.status_code === 901) {
        swal('Thông báo!', 'Điểm của Host không hợp lệ!', 'error');
      } else if (response.status_code === 900) {
        swal('Thông báo!', 'Không tìm thấy hoạt động!', 'error');
      } else if (response.status_code === 926) {
        swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
      }
    })
  }

  onUpdateSeminar(update: any) {
    const groupType = new Activity();
    groupType.id = 1;
    this.seminarActivity.groupTypeId = groupType;
    this.seminarActivity.additionalConfig = this.createdActivity;
    this.seminarActivity.name = this.activityName;
    return this.seminarService.updateSeminar(this.groupId, this.seminarActivity).subscribe(response => {
      if (response.status_code === 200) {
        this.change.emit(update);
        this.dismiss();
        return swal('Chúc Mừng!', 'Đã sửa thành công!', 'success');
      } else if (response.status_code === 940) {
        swal('Thông báo!', 'Điểm của người phía dưới không được lớn hơn!', 'error');
      } else if (response.status_code === 901) {
        swal('Thông báo!', 'Điểm của Host không hợp lệ!', 'error');
      } else if (response.status_code === 900) {
        swal('Thông báo!', 'Không tìm thấy hoạt động!', 'error');
      } else if (response.status_code === 926) {
        swal('Thông báo!', 'Hoạt động này đã tồn tại!', 'error');
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
