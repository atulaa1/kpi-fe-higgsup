import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {KpiDateFormatter} from '../../../modals/personal-info/kpi-date-formatter';
import {SupportService} from '../../../@core/services/support.service';
import {Group} from '../../../@core/models/group.model';
import {Activity} from '../../../@core/models/activity.model';
import {ResponseEventDTO} from '../../../@core/models/responseEventDTO.model';
import {EventSupport} from '../../../@core/models/eventSupport.model';
import {ActivitiesConfirmService} from '../../../@core/services/activities-confirm.service';

@Component({
  selector: 'ngx-support-activity',
  templateUrl: './support-activity.component.html',
  styleUrls: ['./support-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class SupportActivityComponent implements OnInit {
  @Input() dismiss;
  @Input() eventSupportInfoCreating;
  @Input() eventSupportInfoCreated;
  @Input() groupId: number = null;
  @Input() dateCreated: string = '';
  @Input() listSelectedEvent = [];
  @Input() activityName: string = '';
  @Output() change = new EventEmitter<any>();
  eventConfirmation = {status: null};
  supportEvents = [
    {type: 'Dọn dẹp', name: 'cleanUpPoint', status: false, quantity: 1},
    {type: 'Mua đồ', name: 'buyingStuffPoint', status: false, quantity: 1},
    {type: 'Support Hội thảo', name: 'supportConferencePoint', status: false, quantity: 1},
    {type: 'Training', name: 'trainingPoint', status: false, quantity: 1},
    {type: 'Vệ sinh hàng tuần', name: 'weeklyCleanUpPoint', status: false, quantity: 1},
  ];
  selectedSupportEvents = [];
  listSelectedSupportEvent = [
    {name: '', quantity: 1},
    {name: '', quantity: 1},
    {name: '', quantity: 1},
    {name: '', quantity: 1},
    {name: '', quantity: 1},
  ];
  listFilteredSelectedSupportEvent = [];
  startDate;
  beginDate: string;
  startTime = {hour: 7, minute: 0o0};
  name: string;
  quantity: number;
  supportEvent: EventSupport = new EventSupport();
  isAdmin: boolean = false;

  constructor(private supportService: SupportService, private activitiesConfirmService: ActivitiesConfirmService) {
  }

  onSubmitEvent(value) {
    this.eventConfirmation.status = value;
    this.activitiesConfirmService.confirmEvent(this.eventConfirmation, this.eventSupportInfoCreated.id).subscribe(response => {
      if (response.status_code === 200) {
        swal('Chúc Mừng!', 'Thao tác thành công!', 'success');
        this.change.emit(value);
        this.dismiss();
      } else if (response.status_code === 903) {
        swal('Xin lỗi', 'status của event không thể được null!', 'error');
        this.dismiss();
      } else if (response.status_code === 900) {
        swal('Xin lỗi', 'không tìm thấy event bởi id!', 'error')
      } else if (response.status_code === 907) {
        swal('Xin lỗi', 'event đã được xác nhận hoặc hủy!', 'error')
      } else if (response.status_code === 999) {
        swal('Xin lỗi', 'Lỗi hệ thống , liên hệ admin!', 'error')
      }
    });
  }

  ngOnInit() {
    this.supportEvents.forEach(value => {
      const supportEvents: any = this.listSelectedEvent.filter(value1 => value1.name === value.name);
      if (supportEvents.length > 0) {
        value.status = true;
        value.quantity = supportEvents[0].quantity;
      }
    });

    this.dateCreated = this.dateCreated.slice(0, 10);
    const currentEndDate = new Date(this.reverse(this.dateCreated));
    this.startDate = this.convertDatetoNgbDateStruct(currentEndDate);
    const userRole: any = JSON.parse(localStorage.getItem('currentUser')).userRole.filter(role => role === 'ROLE_ADMIN');
    if (userRole.length > 0) {
      this.isAdmin = true;
    }

  }

  private convertDatetoNgbDateStruct(date: Date): NgbDateStruct {
    return date ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : null;
  }

  private convertNgbDateStructToString(date: NgbDateStruct): string {
    return date ? `${this.padNumber(date.day)}-${this.padNumber(date.month)}-${date.year}` : null;
  }

  private convertNgbtimeStructToString(time) {
    return time ? `${this.padNumber(time.hour)}:${this.padNumber(time.minute)}` : null;
  }

  private reverse(string) {
    return string.split('-').reverse().join('-');
  }


  private isNumber(value: any): boolean {
    return !isNaN(parseInt(value, 10));
  }

  private padNumber(value: number) {
    if (this.isNumber(value)) {
      return `0${value}`.slice(-2);
    } else {
      return '';
    }
  }

  closeModal() {
    this.dismiss();
  }


  changeSelect(supportEvent, event) {
    if (event.target.checked === true) {
      supportEvent.status = true;
      this.selectedSupportEvents.push(supportEvent);
    } else {
      const updateItem = this.selectedSupportEvents.find(this.findIndexToUpdate, supportEvent.name);

      const index = this.selectedSupportEvents.indexOf(updateItem);

      this.selectedSupportEvents.splice(supportEvent, 1);
      supportEvent.status = false;
    }

  }

  findIndexToUpdate(supportEvent) {
    return supportEvent.name === this;
  }

  addSupportEvent() {
    for (let i = 0; i < this.selectedSupportEvents.length; i++) {
      this.listSelectedSupportEvent[i].name = this.selectedSupportEvents[i].name;
      this.listSelectedSupportEvent[i].quantity = this.selectedSupportEvents[i].quantity;

    }
    this.listFilteredSelectedSupportEvent = this.listSelectedSupportEvent
      .filter((supporEvent) => supporEvent.name !== '');
    if (isNaN(this.startDate.day) === true || isNaN(this.startDate.month) === true ||
      isNaN(this.startDate.year) === true || this.startDate === null) {
      swal('Thông báo!', 'Thời gian bắt đầu không được để trống', 'error');
    } else {
      this.beginDate = this.convertNgbDateStructToString(this.startDate);
      const group: Group<Activity> = new Group();
      group.id = this.eventSupportInfoCreating.id;
      this.supportEvent.group = group;
      this.supportEvent.beginDate = this.beginDate + ' ' + this.convertNgbtimeStructToString(this.startTime);
      this.supportEvent.additionalConfig = this.listFilteredSelectedSupportEvent;
      this.supportService.createEventSupport(this.supportEvent).subscribe((response: ResponseEventDTO) => {
        if (response.status_code === 200) {
          swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
          this.dismiss();
        } else if (response.status_code === 901 && response.message === 'start date cannot null') {
          swal('Thông báo!', 'Ngày bắt đầu không được để trống!', 'error');
        } else if (response.status_code === 901 && response.message === 'group cannot null') {
          swal('Thông báo!', 'Group không được để trống!', 'error');
        } else if (response.status_code === 901 && response.message === 'group ID can not be null') {
          swal('Thông báo!', 'ID Group không được để trống!', 'error');
        } else if (response.status_code === 901 && response.message === 'roup ID not is support') {
          swal('Thông báo!', 'ID Group không phải là Support!', 'error');
        } else if (response.status_code === 901 && response.message === 'list support can not empty') {
          swal('Thông báo!', 'Danh sách support không được rỗng!', 'error');
        } else if (response.status_code === 901 && response.message === 'name at index {index} can not null') {
          swal('Thông báo!', 'tên tại 1 không thể rỗng!', 'error');
        } else if (response.status_code === 901 && response.message === 'ame support at index {index} not incorrect') {
          swal('Thông báo!', 'tên support tại 1 không chính xác!', 'error');
        } else if (response.status_code === 901 && response.message === 'quantity at index {index} can not null') {
          swal('Thông báo!', 'Số lượng tại 1 không thể rỗng!', 'error');
        } else if (response.status_code === 901 && response.message === 'quantity at index {index} can less one') {
          swal('Thông báo!', 'Số lượng tại 1 không thể nhỏ hơn 1!', 'error');
        } else if (response.status_code === 999 && response.message === 'system error') {
          swal('Thông báo!', 'Lỗi hệ thống, Vui lòng liên hệ Admin!', 'error');
        }
      });
    }
  }

  updateSupportEvent(update) {
    this.selectedSupportEvents = this.supportEvents
      .filter((supporEvent) => supporEvent.status === true);

    for (let i = 0; i < this.selectedSupportEvents.length; i++) {
      this.listSelectedSupportEvent[i].name = this.selectedSupportEvents[i].name;
      this.listSelectedSupportEvent[i].quantity = this.selectedSupportEvents[i].quantity;
    }

    this.listFilteredSelectedSupportEvent = this.listSelectedSupportEvent
      .filter((supporEvent) => supporEvent.name !== '');
    if (this.startDate === undefined || this.startDate === null
      || this.startTime === undefined || this.startTime === null) {
      swal('Thông báo!', 'Thời gian bắt đầu không được để trống', 'error');
    } else {
      this.beginDate = this.convertNgbDateStructToString(this.startDate);
      const group: Group<Activity> = new Group();
      group.id = this.eventSupportInfoCreated.group.id;
      this.supportEvent.group = group;
      this.supportEvent.beginDate = this.beginDate + ' ' + this.convertNgbtimeStructToString(this.startTime);
      this.supportEvent.additionalConfig = this.listFilteredSelectedSupportEvent;
      this.supportService.updateEventSupport(this.supportEvent, this.eventSupportInfoCreated.id).subscribe((response: ResponseEventDTO) => {
        if (response.status_code === 200) {
          this.change.emit(update);
          swal('Chúc Mừng!', 'Đã sửa thành công!', 'success');
          this.dismiss();
        } else if (response.status_code === 901 && response.message === 'start date cannot null') {
          swal('Thông báo!', 'Ngày bắt đầu không được để trống!', 'error');
        } else if (response.status_code === 901 && response.message === 'group cannot null') {
          swal('Thông báo!', 'Group không được để trống!', 'error');
        } else if (response.status_code === 901 && response.message === 'group ID can not be null') {
          swal('Thông báo!', 'ID Group không được để trống!', 'error');
        } else if (response.status_code === 901 && response.message === 'roup ID not is support') {
          swal('Thông báo!', 'ID Group không phải là Support!', 'error');
        } else if (response.status_code === 901 && response.message === 'list support can not empty') {
          swal('Thông báo!', 'Danh sách support không được rỗng!', 'error');
        } else if (response.status_code === 901 && response.message === 'name at index {index} can not null') {
          swal('Thông báo!', 'tên tại 1 không thể rỗng!', 'error');
        } else if (response.status_code === 901 && response.message === 'ame support at index {index} not incorrect') {
          swal('Thông báo!', 'tên support tại 1 không chính xác!', 'error');
        } else if (response.status_code === 901 && response.message === 'quantity at index {index} can not null') {
          swal('Thông báo!', 'Số lượng tại 1 không thể rỗng!', 'error');
        } else if (response.status_code === 901 && response.message === 'quantity at index {index} can less one') {
          swal('Thông báo!', 'Số lượng tại 1 không thể nhỏ hơn 1!', 'error');
        } else if (response.status_code === 999 && response.message === 'system error') {
          swal('Thông báo!', 'Lỗi hệ thống, Vui lòng liên hệ Admin!', 'error');
        } else if (response.status_code === 403 && response.message === 'Forbidden') {
          swal('Thông báo!', 'Bạn không có quyền sửa cho hoạt động này!', 'error');
        }
      });
    }
  }

}
