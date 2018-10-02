import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {KpiDateFormatter} from '../../../modals/personal-info/kpi-date-formatter';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {UserService} from '../../../@core/services/user.service';
import {User} from '../../../@core/models/user.model';
import {ResponseUserDTO} from '../../../@core/models/responseUserDTO.model';
import {ActivitiesConfirmService} from '../../../@core/services/activities-confirm.service';

import {Event} from '../../../@core/models/event.model';
import {UserType} from '../../../@core/models/userType.model';
import {Activity} from '../../../@core/models/activity.model';
import {Group} from '../../../@core/models/group.model';
import {ClubService} from '../../../@core/services/club.service';

@Component({
  selector: 'ngx-club-activity',
  templateUrl: './club-activity.component.html',
  styleUrls: ['./club-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class ClubActivityComponent implements OnInit {
  @Input() dismiss;
  @Input() eventClubInfoCreating = new Event();
  @Input() eventClubInfoCreated = new Event();
  @Input() groupId: number = null;
  @Input() activityName: string = '';
  @Output() change = new EventEmitter<any>();
  startTime = {hour: 12, minute: 0o0};
  endTime = {hour: 12, minute: 0o0};
  spinners: boolean = false;
  startDate;
  endDate;
  listUser: Array<User>;
  listCloneUser: Array<User>;
  eventClub: Event = new Event();
  eventName: string = '';
  eventAddress: string = '';
  hostName: string = '';
  listEventUser: Array<UserType> = new Array<UserType>();
  userCtrl = new FormControl();
  filteredUsers: Observable<Array<User>>;
  userClone: Array<any> = [];
  separatorKeysCodes: Array<number> = [ENTER, COMMA];
  eventConfirmation = {status: null};

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  isAdmin: boolean = false;
  alert: boolean = false;

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService, private clubService: ClubService,
              private activitiesConfirmService: ActivitiesConfirmService) {
    this.userCtrl = new FormControl();
    this.filteredUsers = this.userCtrl.valueChanges
      .startWith(null)
      .map(user => user && typeof user === 'object' ? user.fullName : user)
      .map(user => this.filterUsers(user));
  }

  filterUsers(val) {
    return val ? this.listCloneUser.filter(user => user.fullName.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.listCloneUser;
  }

  displayFn(user): string {
    return user ? user.fullName : user;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add user
    if ((value || '').trim()) {
      this.userClone.push({
        fullname: value,
        username: value,
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userCtrl.setValue(null);
  }

  remove(fullName, i): void {
    let users: Array<User> = [];
    this.filteredUsers.subscribe(value => users = value.filter(value1 => value1 ));
    users.push(Object.assign(this.userClone[i]));
    this.filteredUsers = this.setFilteredUsers(users);
    this.userClone.splice(i, 1);

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.userClone.push(event.option.value);
    let users: Array<User> = [];

    this.filteredUsers.subscribe(value => users = value.filter(value1 => value1.username !== event.option.value.username));
    this.filteredUsers = this.setFilteredUsers(users);

    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  setFilteredUsers(users: Array<User>) {
    this.userCtrl = new FormControl();
    let usersObservable: Observable<Array<User>>;
    usersObservable = this.userCtrl.valueChanges
      .startWith(null)
      .map(user => user && typeof user === 'object' ? user.fullName : user)
      .map(user => user ? users.filter(user1 => user1.fullName.toLowerCase().indexOf(user.toLowerCase()) === 0)
        : users);
    return usersObservable;
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
        this.listCloneUser = Object.assign([], this.listUser);
      }
    });

    this.eventName = this.eventClubInfoCreated.name;
    this.eventAddress = this.eventClubInfoCreated.address;
    const currentStartDate = new Date(this.reverse(this.eventClubInfoCreated.beginDate.slice(0, 10)));
    this.startDate = this.convertDatetoNgbDateStruct(currentStartDate);
    const currentEndDate = new Date(this.reverse(this.eventClubInfoCreated.endDate.slice(0, 10)));
    this.endDate = this.convertDatetoNgbDateStruct(currentEndDate);
    this.startTime = this.convertTimeStringtoNgbTimeStruct(this.eventClubInfoCreated.beginDate);
    this.endTime = this.convertTimeStringtoNgbTimeStruct(this.eventClubInfoCreated.endDate);
    for (let i = 0; i < this.eventClubInfoCreated.eventUserList.length; i++) {
      this.userClone.push(this.eventClubInfoCreated.eventUserList[i].user);
      if (this.eventClubInfoCreated.eventUserList[i].type === 1) {
        this.hostName = this.eventClubInfoCreated.eventUserList[i].user.username;
      }
    }
    const userRole: any = JSON.parse(localStorage.getItem('currentUser')).userRole.filter(role => role === 'ROLE_ADMIN');
    if (userRole.length > 0) {
      this.isAdmin = true;
    }
  }

  closeModal() {
    this.dismiss();
  }

  onSubmitEvent(value) {
    this.eventConfirmation.status = value;
    this.activitiesConfirmService.confirmEvent(this.eventConfirmation, this.eventClubInfoCreated.id).subscribe(response => {
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

  onSubmit(created: any) {
    this.eventClub.name = this.eventName;
    if (this.eventClub.name === undefined || this.eventClub.name.trim() === ''
      || this.startDate === undefined || this.startDate === null
      || this.startTime === undefined || this.startTime === null
      || this.endDate === undefined || this.endTime === null
      || this.endTime === undefined || this.endTime === null) {
      this.alert = true;
    } else {
      this.alert = false;
      this.eventClub.address = this.eventAddress;
      this.eventClub.beginDate = this.convertNgbDateStructToString(this.startDate) + ' '
        + this.convertNgbtimeStructToString(this.startTime);
      this.eventClub.endDate = this.convertNgbDateStructToString(this.endDate) + ' '
        + this.convertNgbtimeStructToString(this.endTime);

      // Lấy username trong array đã chọn ở mục chọn người tham gia gán vào username
      for (let i = 0; i < this.userClone.length; i++) {
        const userMem: User = new User();
        const eventUser: UserType = new UserType();
        userMem.username = this.userClone[i].username;
        if (userMem.username === this.eventClubInfoCreating.additionalConfig.host) {
          eventUser.user = userMem;
          eventUser.type = 1;
          this.listEventUser.push(eventUser);
        } else {
          eventUser.user = userMem;
          eventUser.type = 2;
          this.listEventUser.push(eventUser);
        }
      }
      this.eventClub.eventUserList = this.listEventUser;
      const group: Group<Activity> = new Group();
      group.id = this.eventClubInfoCreating.id;
      this.eventClub.group = group;
      this.clubService.addEventClub(this.eventClub).subscribe((response: ResponseUserDTO) => {
        if (response.status_code === 200) {
          this.change.emit(created);
          this.dismiss();
          swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
        } else if (response.status_code === 903 && response.message === 'name does not allow null') {
          swal('Thông báo!', 'Tên hoạt động không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'begin date cannot null') {
          swal('Thông báo!', 'Ngày bắt đầu không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'end date cannot null') {
          swal('Thông báo!', 'Ngày kết thúc không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'list of participants cannot null') {
          swal('Thông báo!', 'Danh sách người tham gia không được để trống!', 'error');
        } else if (response.status_code === 932 && response.message === 'begin date is not after end date') {
          swal('Thông báo!', 'Vui lòng chọn thời gian bắt đầu nhỏ hơn thời gian kết thúc!', 'error');
        } else if (response.status_code === 900 && response.message === 'not find group') {
          swal('Thông báo!', 'Hoạt động không tồn tại!', 'error');
        } else if (response.status_code === 903 && response.message === 'user type cannot null') {
          swal('Thông báo!', 'Loại user không được để trống!', 'error');
        } else if (response.status_code === 900 && response.message === 'member type does not exist') {
          swal('Thông báo!', 'Loại member không tồn tại!', 'error');
        } else if (response.status_code === 900 && response.message === 'user does not exist') {
          swal('Thông báo!', 'User không tồn tại!', 'error');
        }
      });
    }


  }

  onUpdate(update: any) {
    const group: Group<Activity> = new Group();
    group.id = this.eventClubInfoCreated.group.id;
    this.eventClub.group = group;
    this.eventClub.name = this.eventName;
    if (this.eventClub.name === undefined || this.eventClub.name.trim() === ''
      || this.startDate === undefined || this.startDate === null
      || this.startTime === undefined || this.startTime === null
      || this.endDate === undefined || this.endTime === null
      || this.endTime === undefined || this.endTime === null) {
      this.alert = true;
    } else {
      this.alert = false;
      this.eventClub.address = this.eventAddress;
      this.eventClub.beginDate = this.convertNgbDateStructToString(this.startDate) + ' '
        + this.convertNgbtimeStructToString(this.startTime);
      this.eventClub.endDate = this.convertNgbDateStructToString(this.endDate) + ' '
        + this.convertNgbtimeStructToString(this.endTime);

      // Lấy username trong array đã chọn ở mục chọn người tham gia gán vào username
      for (let i = 0; i < this.userClone.length; i++) {
        const userMem: User = new User();
        const eventUser: UserType = new UserType();
        userMem.username = this.userClone[i].username;
        if (userMem.username === this.hostName) {
          eventUser.user = userMem;
          eventUser.type = 1;
          this.listEventUser.push(eventUser);
        } else {
          eventUser.user = userMem;
          eventUser.type = 2;
          this.listEventUser.push(eventUser);
        }
      }
      this.eventClub.eventUserList = this.listEventUser;
      this.clubService.updateEventClub(this.eventClub, this.eventClubInfoCreated.id).subscribe((response: ResponseUserDTO) => {
        if (response.status_code === 200) {
          this.change.emit(update);
          this.dismiss();
          swal('Chúc Mừng!', 'Đã sửa thành công!', 'success');
        } else if (response.status_code === 903 && response.message === 'name does not allow null') {
          swal('Thông báo!', 'Tên hoạt động không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'begin date cannot null') {
          swal('Thông báo!', 'Ngày bắt đầu không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'end date cannot null') {
          swal('Thông báo!', 'Ngày kết thúc không được để trống!', 'error');
        } else if (response.status_code === 903 && response.message === 'list of participants cannot null') {
          swal('Thông báo!', 'Danh sách người tham gia không được để trống!', 'error');
        } else if (response.status_code === 932 && response.message === 'begin date is not after end date') {
          swal('Thông báo!', 'Vui lòng chọn thời gian bắt đầu nhỏ hơn thời gian kết thúc!', 'error');
        } else if (response.status_code === 900 && response.message === 'not find group') {
          swal('Thông báo!', 'Hoạt động không tồn tại!', 'error');
        } else if (response.status_code === 903 && response.message === 'user type cannot null') {
          swal('Thông báo!', 'Loại user không được để trống!', 'error');
        } else if (response.status_code === 900 && response.message === 'member type does not exist') {
          swal('Thông báo!', 'Loại member không tồn tại!', 'error');
        } else if (response.status_code === 900 && response.message === 'user does not exist') {
          swal('Thông báo!', 'User không tồn tại!', 'error');
        }
      });
    }
  }
}
