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
  alert: boolean = false;

  constructor(private activeModal: NgbActiveModal, private seminarService: SeminarService, private data: DataService) {
  }


  onAddSeminar(addNew: any) {
    const groupType = new Activity();
    groupType.id = 1;
    this.seminarActivity.groupType = groupType;
    this.seminarActivity.additionalConfig = this.createdActivity;
    this.seminarActivity.name = this.activityName;
    if (this.seminarActivity.name === ''
      || !this.seminarActivity.additionalConfig.hostPoint
      || !this.seminarActivity.additionalConfig.memberPoint
      || !this.seminarActivity.additionalConfig.listenerPoint) {
      this.alert = true;
    } else {
      this.alert = false;
      return this.seminarService.addSeminar(this.seminarActivity).subscribe(response => {
        if (response.status_code === 200) {
          this.activeModal.close();
          this.data.changeMessage('Created new an activity');
          swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
        } else if (response.status_code === 906) {
          swal('Thông báo!', 'Hoạt động Seminar này đã tồn tại!', 'error');
        } else if (response.status_code === 900) {
          swal('Thông báo!', 'Loại hoạt động không tồn tại!', 'error');
        } else if (response.status_code === 901 && response.message === 'parameter point of host is not valid') {
          swal('Thông báo!', 'Điểm của Host không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'parameter point of member is not valid') {
          swal('Thông báo!', 'Điểm của thành viên không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'parameter point of listener is not valid') {
          swal('Thông báo!', 'Điểm của người dự thính không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'host score can not be null') {
          swal('Thông báo!', 'Điểm của Host không được bằng 0!', 'error');
        } else if (response.status_code === 901 && response.message === 'member score can not be null') {
          swal('Thông báo!', 'Điểm của thành viên không được bằng 0!', 'error');
        }
      })
    }
  }

  onUpdateSeminar(update: any) {
    const groupType = new Activity();
    groupType.id = 1;
    this.seminarActivity.groupType = groupType;
    this.seminarActivity.additionalConfig = this.createdActivity;
    this.seminarActivity.name = this.activityName;
    if (this.seminarActivity.name === ''
      || !this.seminarActivity.additionalConfig.hostPoint
      || !this.seminarActivity.additionalConfig.memberPoint
      || !this.seminarActivity.additionalConfig.listenerPoint) {
      this.alert = true;
    } else {
      this.alert = false;
      return this.seminarService.updateSeminar(this.groupId, this.seminarActivity).subscribe(response => {
        if (response.status_code === 200) {
          this.change.emit(update);
          this.dismiss();
          return swal('Chúc Mừng!', 'Đã sửa thành công!', 'success');
        } else if (response.status_code === 906) {
          swal('Thông báo!', 'Hoạt động Seminar này đã tồn tại!', 'error');
        } else if (response.status_code === 900) {
          swal('Thông báo!', 'Loại hoạt động không tồn tại!', 'error');
        } else if (response.status_code === 901 && response.message === 'parameter point of host is not valid') {
          swal('Thông báo!', 'Điểm của Host không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'parameter point of member is not valid') {
          swal('Thông báo!', 'Điểm của thành viên không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'parameter point of listener is not valid') {
          swal('Thông báo!', 'Điểm của người dự thính không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'host score can not be null') {
          swal('Thông báo!', 'Điểm của Host không được bằng 0!', 'error');
        } else if (response.status_code === 901 && response.message === 'member score can not be null') {
          swal('Thông báo!', 'Điểm của thành viên không được bằng 0!', 'error');
        }
      })
    }
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  onClose() {
    this.activeModal.close();
  }
}
