import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {KpiDateFormatter} from '../../../modals/personal-info/kpi-date-formatter';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {User} from '../../../@core/models/user.model';
import {Event} from '../../../@core/models/event.model';
import {UserType} from '../../../@core/models/userType.model';
import {UserService} from '../../../@core/services/user.service';
import {ActivitiesService} from '../../../@core/services/activities.service';
import {ResponseUserDTO} from '../../../@core/models/responseUserDTO.model';
import {Group} from '../../../@core/models/group.model';
import {Activity} from '../../../@core/models/activity.model';
import {SeminarService} from '../../../@core/services/seminar.service';

@Component({
  selector: 'ngx-seminar-activity',
  templateUrl: './seminar-activity.component.html',
  styleUrls: ['./seminar-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class SeminarActivityComponent implements OnInit {
  @Input() dismiss;
  @Input() eventSeminarInfoCreating = new Event();
  @Input() eventSeminarInfoCreated = new Event();
  @Input() groupId: number = null;
  @Input() activityName: string = '';
  @Output() change = new EventEmitter<any>();
  startTime = {hour: 12, minute: 0o0};
  endTime = {hour: 12, minute: 0o0};
  spinners: boolean = false;
  startDate;
  endDate;
  listUser: Array<User>;
  listCloneUserHost: Array<User>;
  listCloneUserParticipant: Array<User>;
  listCloneUserListener: Array<User>;
  eventSeminar: Event = new Event();
  eventName: string = '';
  listEventUser: Array<UserType> = new Array<UserType>();
  userHostCtrl = new FormControl();
  userParticipantCtrl = new FormControl();
  userListenerCtrl = new FormControl();
  filteredHostUsers: Observable<Array<User>>;
  filteredParticipantUsers: Observable<Array<User>>;
  filteredListenerUsers: Observable<Array<User>>;
  userClone: Array<any> = [];
  userCloneHost: Array<any> = [];
  userCloneParticipant: Array<any> = [];
  userCloneListener: Array<any> = [];
  separatorKeysCodes: Array<number> = [ENTER, COMMA];


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;


  @ViewChild('userHostInput') userHostInput: ElementRef<HTMLInputElement>;
  @ViewChild('userParticipantInput') userParticipantInput: ElementRef<HTMLInputElement>;
  @ViewChild('userListenerInput') userListenerInput: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService, private seminarService: SeminarService, private activitiesService: ActivitiesService) {
    // map Object type for Host
    this.userHostCtrl = new FormControl();
    this.filteredHostUsers = this.userHostCtrl.valueChanges
      .startWith(null)
      .map(user => user && typeof user === 'object' ? user.fullName : user)
      .map(user => this.filterUsersHost(user));

    // map Object type for Participant
    this.userParticipantCtrl = new FormControl();
    this.filteredParticipantUsers = this.userParticipantCtrl.valueChanges
      .startWith(null)
      .map(user => user && typeof user === 'object' ? user.fullName : user)
      .map(user => this.filterUsersParticipant(user));

    // map Object type for Listener
    this.userListenerCtrl = new FormControl();
    this.filteredListenerUsers = this.userListenerCtrl.valueChanges
      .startWith(null)
      .map(user => user && typeof user === 'object' ? user.fullName : user)
      .map(user => this.filterUsersListener(user));
  }

  // Array Host user tags

  filterUsersHost(val) {
    return val ? this.listCloneUserHost.filter(user => user.fullName.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.listCloneUserHost;
  }

  displayHostFn(user): string {
    return user ? user.fullName : user;
  }

  addHost(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add user
    if ((value || '').trim()) {
      this.userCloneHost.push({
        fullname: value,
        username: value,
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userHostCtrl.setValue(null);
  }

  removeHost(fullName, i): void {
    this.userCloneHost.splice(i, 1);
  }

  selectedHost(event: MatAutocompleteSelectedEvent): void {
    this.userCloneHost.push(event.option.value);
    this.userHostInput.nativeElement.value = '';
    this.userHostCtrl.setValue(null);
  }

  // Array Participant user tags

  filterUsersParticipant(val) {
    return val ? this.listCloneUserParticipant.filter(user => user.fullName.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.listCloneUserParticipant;
  }

  displayParticipantFn(user): string {
    return user ? user.fullName : user;
  }

  addParticipant(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add user
    if ((value || '').trim()) {
      this.userCloneParticipant.push({
        fullname: value,
        username: value,
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userParticipantCtrl.setValue(null);
  }

  removeParticipant(fullName, i): void {
    this.userCloneParticipant.splice(i, 1);
  }

  selectedParticipant(event: MatAutocompleteSelectedEvent): void {
    this.userCloneParticipant.push(event.option.value);
    this.userParticipantInput.nativeElement.value = '';
    this.userParticipantCtrl.setValue(null);
  }

  // Array Listener user tags

  filterUsersListener(val) {
    return val ? this.listCloneUserListener.filter(user => user.fullName.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.listCloneUserListener;
  }

  displayListenerFn(user): string {
    return user ? user.fullName : user;
  }

  addListener(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add user
    if ((value || '').trim()) {
      this.userCloneListener.push({
        fullname: value,
        username: value,
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userListenerCtrl.setValue(null);
  }

  removeListener(fullName, i): void {
    this.userCloneListener.splice(i, 1);
  }

  selectedListener(event: MatAutocompleteSelectedEvent): void {
    this.userCloneListener.push(event.option.value);
    this.userListenerInput.nativeElement.value = '';
    this.userListenerCtrl.setValue(null);
  }

  // Functions

  private convertDatetoNgbDateStruct(date: Date): NgbDateStruct {
    return date ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : null;
  }

  private convertNgbDateStructToString(date: NgbDateStruct): string {
    return date ? `${this.padNumber(date.day)}-${this.padNumber(date.month)}-${date.year}` : null;
  }

  private convertNgbtimeStructToString(time) {
    return time ? `${this.padNumber(time.hour)}:${this.padNumber(time.minute)}` : null;
  }

  private convertTimeStringtoNgbTimeStruct(time: string) {
    return time ? {hour: parseInt(time.slice(11, 13), 10), minute: parseInt(time.slice(14, 16), 10)} : null;
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

  ngOnInit() {
    this.userService.getUsers().subscribe((response: ResponseUserDTO) => {
      if (response.status_code === 200) {
        this.listUser = response.data;
        this.listCloneUserHost = Object.assign([], this.listUser);
        this.listCloneUserParticipant = Object.assign([], this.listUser);
        this.listCloneUserListener = Object.assign([], this.listUser);
      }
    });

    this.eventName = this.eventSeminarInfoCreated.name;
    const currentStartDate = new Date(this.reverse(this.eventSeminarInfoCreated.beginDate.slice(0, 10)));
    this.startDate = this.convertDatetoNgbDateStruct(currentStartDate);
    const currentEndDate = new Date(this.reverse(this.eventSeminarInfoCreated.endDate.slice(0, 10)));
    this.endDate = this.convertDatetoNgbDateStruct(currentEndDate);
    this.startTime = this.convertTimeStringtoNgbTimeStruct(this.eventSeminarInfoCreated.beginDate);
    this.endTime = this.convertTimeStringtoNgbTimeStruct(this.eventSeminarInfoCreated.endDate);
    for (let i = 0; i < this.eventSeminarInfoCreated.eventUserList.length; i++) {
      if (this.eventSeminarInfoCreated.eventUserList[i].type === 1) {
        this.userCloneHost.push(this.eventSeminarInfoCreated.eventUserList[i].user);
      } else if (this.eventSeminarInfoCreated.eventUserList[i].type === 2) {
        this.userCloneParticipant.push(this.eventSeminarInfoCreated.eventUserList[i].user);
      } else {
        this.userCloneListener.push(this.eventSeminarInfoCreated.eventUserList[i].user);
      }
    }
  }

  closeModal() {
    this.dismiss();
  }

  addSeminarEvent(created: any) {

    this.eventSeminar.name = this.eventName;
    if (this.eventSeminar.name === undefined || this.eventSeminar.name.trim() === '') {
      swal('Thông báo!', 'Tên hoạt động không được để trống!', 'error');
    } else if (this.startDate === undefined || this.startDate === null
      || this.startTime === undefined || this.startTime === null) {
      swal('Thông báo!', 'Thời gian bắt đầu không được để trống', 'error');
    } else if (this.endDate === undefined || this.endTime === null
      || this.endTime === undefined || this.endTime === null) {
      swal('Thông báo!', 'Thời gian kết thúc không được để trống!', 'error');
    } else {
      this.eventSeminar.beginDate = this.convertNgbDateStructToString(this.startDate) + ' '
        + this.convertNgbtimeStructToString(this.startTime);
      this.eventSeminar.endDate = this.convertNgbDateStructToString(this.endDate) + ' '
        + this.convertNgbtimeStructToString(this.endTime);

      // Lấy username trong array Host đã chọn gán vào username
      for (let i = 0; i < this.userCloneHost.length; i++) {
        const userMem: User = new User();
        const eventUser: UserType = new UserType();
        userMem.username = this.userCloneHost[i].username;
        eventUser.user = userMem;
        eventUser.type = 1;
        this.listEventUser.push(eventUser);
      }
      // Lấy username trong array Participant đã chọn gán vào username
      for (let i = 0; i < this.userCloneParticipant.length; i++) {
        const userMem: User = new User();
        const eventUser: UserType = new UserType();
        userMem.username = this.userCloneParticipant[i].username;
        eventUser.user = userMem;
        eventUser.type = 2;
        this.listEventUser.push(eventUser);
      }

      // Lấy username trong array Listener đã chọn gán vào username
      for (let i = 0; i < this.userCloneListener.length; i++) {
        const userMem: User = new User();
        const eventUser: UserType = new UserType();
        userMem.username = this.userCloneListener[i].username;
        eventUser.user = userMem;
        eventUser.type = 3;
        this.listEventUser.push(eventUser);
      }

      this.eventSeminar.eventUserList = this.listEventUser;
      const group: Group<Activity> = new Group();
      group.id = this.eventSeminarInfoCreating.id;
      this.eventSeminar.group = group;
      this.seminarService.addSeminarEvent(this.eventSeminar).subscribe((response: ResponseUserDTO) => {
        if (response.status_code === 200) {
          this.change.emit(created);
          this.dismiss();
          swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
        } else if (response.status_code === 903 && response.message === 'event can not be null') {
          swal('Thông báo!', 'Tên hoạt động không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'group cannot null') {
          swal('Thông báo!', 'Group không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'event user list can not be null') {
          swal('Thông báo!', 'Các thành viên tham gia không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'username can not be null') {
          swal('Thông báo!', 'Username không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'member type of event can not be null') {
          swal('Thông báo!', 'Member type không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'name of event can not be null') {
          swal('Thông báo!', 'Tên hoạt động không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'begin date of event can not be null') {
          swal('Thông báo!', 'Không được để trống ngày bắt đầu hoạt động!', 'error');
        } else if (response.status_code === 903 && response.message === 'end date of event can not be null') {
          swal('Thông báo!', 'Không được để trống ngày kết thúc hoạt động!', 'error');
        } else if (response.status_code === 901 && response.message === 'member type of event is invalidated') {
          swal('Thông báo!', 'Loại thành viên không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'end date has to be after begin date') {
          swal('Thông báo!', 'Vui lòng chọn thời gian bắt đầu nhỏ hơn thời gian kết thúc!', 'error');
        } else if (response.status_code === 900 && response.message === 'group type does not exist') {
          swal('Thông báo!', 'Không tìm thấy loại hoạt động!', 'error');
        } else if (response.status_code === 900 && response.message === 'not find user') {
          swal('Thông báo!', 'User không tồn tại!', 'error');
        } else if (response.status_code === 201) {
          swal('Thông báo!', 'Hoạt động đã tồn tại!', 'error');
        } else if (response.status_code === 401) {
          swal('Thông báo!', 'Không có quyền tạo hoạt động!', 'error');
        } else if (response.status_code === 403) {
          swal('Thông báo!', 'Truy cập bị từ chối!', 'error');
        } else if (response.status_code === 900 && response.message === 'not find user') {
          swal('Thông báo!', 'Không tìm thấy!', 'error');
        }
      });
    }
  }


  updateSeminarEvent(update: any) {
    const group: Group<Activity> = new Group();
    group.id = this.eventSeminarInfoCreated.group.id;
    this.eventSeminar.group = group;
    this.eventSeminar.name = this.eventName;
    if (this.eventSeminar.name === undefined || this.eventSeminar.name.trim() === '') {
      swal('Thông báo!', 'Tên hoạt động không được để trống!', 'error');
    } else if (this.startDate === undefined || this.startDate === null
      || this.startTime === undefined || this.startTime === null) {
      swal('Thông báo!', 'Thời gian bắt đầu không được để trống', 'error');
    } else if (this.endDate === undefined || this.endTime === null
      || this.endTime === undefined || this.endTime === null) {
      swal('Thông báo!', 'Thời gian kết thúc không được để trống!', 'error');
    } else {
      this.eventSeminar.beginDate = this.convertNgbDateStructToString(this.startDate) + ' '
        + this.convertNgbtimeStructToString(this.startTime);
      this.eventSeminar.endDate = this.convertNgbDateStructToString(this.endDate) + ' '
        + this.convertNgbtimeStructToString(this.endTime);
      const userMem: User = new User();
      const eventUser: UserType = new UserType();

      // Lấy username trong array Host đã chọn gán vào username
      for (let i = 0; i < this.userCloneHost.length; i++) {
        const userMemHost: User = new User();
        const eventUserHost: UserType = new UserType();
        userMemHost.username = this.userCloneHost[i].username;
        eventUserHost.user = userMemHost;
        eventUserHost.type = 1;
        this.listEventUser.push(eventUserHost);
      }
      // Lấy username trong array Participant đã chọn gán vào username
      for (let i = 0; i < this.userCloneParticipant.length; i++) {
        const userMemParticipant: User = new User();
        const eventParticipant: UserType = new UserType();
        userMemParticipant.username = this.userCloneParticipant[i].username;
        eventParticipant.user = userMemParticipant;
        eventParticipant.type = 2;
        this.listEventUser.push(eventParticipant);
      }

      // Lấy username trong array Listener đã chọn gán vào username
      for (let i = 0; i < this.userCloneListener.length; i++) {
        const userMemListener: User = new User();
        const eventUserListener: UserType = new UserType();
        userMemListener.username = this.userCloneListener[i].username;
        eventUserListener.user = userMemListener;
        eventUserListener.type = 3;
        this.listEventUser.push(eventUserListener);
      }
      this.eventSeminar.eventUserList = this.listEventUser;
      this.seminarService.updateSeminarEvent(this.eventSeminar, this.eventSeminarInfoCreated.id).subscribe((response: ResponseUserDTO) => {
        if (response.status_code === 200) {
          this.change.emit(update);
          this.dismiss();
          swal('Chúc Mừng!', 'Đã sửa thành công!', 'success');
        } else if (response.status_code === 903 && response.message === 'event can not be null') {
          swal('Thông báo!', 'Tên hoạt động không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'group cannot null') {
          swal('Thông báo!', 'Group không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'event user list can not be null') {
          swal('Thông báo!', 'Các thành viên tham gia không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'username can not be null') {
          swal('Thông báo!', 'Username không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'member type of event can not be null') {
          swal('Thông báo!', 'Member type không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'name of event can not be null') {
          swal('Thông báo!', 'Tên hoạt động không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'begin date of event can not be null') {
          swal('Thông báo!', 'Không được để trống ngày bắt đầu hoạt động!', 'error');
        } else if (response.status_code === 903 && response.message === 'end date of event can not be null') {
          swal('Thông báo!', 'Không được để trống ngày kết thúc hoạt động!', 'error');
        } else if (response.status_code === 901 && response.message === 'member type of event is invalidated') {
          swal('Thông báo!', 'Loại thành viên không hợp lệ!', 'error');
        } else if (response.status_code === 901 && response.message === 'end date has to be after begin date') {
          swal('Thông báo!', 'Vui lòng chọn thời gian bắt đầu nhỏ hơn thời gian kết thúc!', 'error');
        } else if (response.status_code === 900 && response.message === 'group type does not exist') {
          swal('Thông báo!', 'Không tìm thấy loại hoạt động!', 'error');
        } else if (response.status_code === 900 && response.message === 'not find user') {
          swal('Thông báo!', 'User không tồn tại!', 'error');
        } else if (response.status_code === 201) {
          swal('Thông báo!', 'Hoạt động đã tồn tại!', 'error');
        } else if (response.status_code === 401) {
          swal('Thông báo!', 'Không có quyền tạo hoạt động!', 'error');
        } else if (response.status_code === 403) {
          swal('Thông báo!', 'Truy cập bị từ chối!', 'error');
        } else if (response.status_code === 900 && response.message === 'not find user') {
          swal('Thông báo!', 'Không tìm thấy!', 'error');
        }
      });
    }
  }
}
