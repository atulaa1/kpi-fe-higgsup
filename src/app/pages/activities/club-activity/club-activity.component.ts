import {Component, Input, OnInit, ElementRef, ViewChild} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {KpiDateFormatter} from '../../../modals/personal-info/kpi-date-formatter';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import {UserService} from '../../../@core/services/user.service';
import {User} from '../../../@core/models/user.model';
import {ResponseUserDTO} from '../../../@core/models/responseUserDTO.model';
import {Event} from '../../../@core/models/event.model';
import {EventUser} from '../../../@core/models/eventUser.model';
import {ClubService} from '../../../@core/services/club.service';
import swal from 'sweetalert';
import {Activity} from '../../../@core/models/activity.model';


@Component({
  selector: 'ngx-club-activity',
  templateUrl: './club-activity.component.html',
  styleUrls: ['./club-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class ClubActivityComponent implements OnInit {
  @Input() dismiss;
  @Input() eventClubInfo;
  @Input() groupId;
  startTime = {hour: 12, minute: 0o0, second: 0o0};
  endTime = {hour: 12, minute: 0o0, second: 0o0};
  spinners: boolean = false;
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  listUser: Array<User>;
  listUserName: Array<string> = [];

  eventClub = new Event();
  userHost: User = new User();


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: Array<number> = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: Observable<Array<string>>;
  usernames: Array<string> = [];

  listEventUser: Array<EventUser> = [];

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService, private clubService: ClubService) {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((filteredUser: string | null) => filteredUser ? this._filter(filteredUser) : this.listUserName.slice()));
  }


  /*  add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      // Add username
      if ((value || '').trim()) {
        this.usernames.push(value.trim());
      }
    console.info(value)
      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.userCtrl.setValue(null);
    }*/

  remove(user: string): void {
    const index = this.usernames.indexOf(user);

    if (index >= 0) {
      this.usernames.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.usernames.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listUserName.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  convertDatetoNgbDateStruct(date: Date): NgbDateStruct {
    return date ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : null;
  }

  private convertNgbDateStructToString(date: NgbDateStruct): string {
    return date ? `${this.padNumber(date.day)}-${this.padNumber(date.month)}-${date.year}` : null;
  }

  private convertNgbtimeStructToString(time: NgbTimeStruct): string {
    return time ? `${this.padNumber(time.hour)}:${this.padNumber(time.minute)}` : null;
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
        for (let i = 0; i < this.listUser.length; i++) {
          this.listUserName.push(this.listUser[i].fullName);
        }
      }
    });
  }

  closeModal() {
    this.dismiss();
  }

  onSubmitAdd() {
    this.eventClub.beginDate = this.convertNgbDateStructToString(this.startDate)
      + ' ' + this.convertNgbtimeStructToString(this.startTime);
    this.eventClub.endDate = this.convertNgbDateStructToString(this.endDate)
      + ' ' + this.convertNgbtimeStructToString(this.endTime);


    for (let i = 0; i < this.usernames.length; i++) {
      const userMem: User = new User();
      const eventUser: EventUser = new EventUser();
      userMem.username = this.usernames[i];
      if (userMem.username === this.eventClubInfo.additionalConfig.host) {
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
    const activity: Activity = new Activity();
    activity.id = this.groupId;
    this.eventClub.group = activity;
    this.clubService.addEventClub(this.eventClub).subscribe((response: ResponseUserDTO) => {
      if (response.status_code === 200) {
          this.dismiss();
        swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
      } else if (response.status_code === 903 && response.message === 'user type can not null') {
        swal('Thông báo!', 'Tên hoạt động không được để trống!', 'error');
      } else if (response.status_code === 903 && response.message === 'begin date cannot null') {
        swal('Thông báo!', 'Ngày bắt đầu không được để trống!', 'error');
      } else if (response.status_code === 903 && response.message === 'end date cannot null') {
        swal('Thông báo!', 'Ngày kết thúc không được để trống!', 'error');
      } else if (response.status_code === 903 && response.message === 'list of participants cannot null') {
        swal('Thông báo!', 'Danh sách người tham gia không được để trống!', 'error');
      } else if (response.status_code === 932 && response.message === 'begin date is not after end date') {
        swal('Thông báo!', 'Thời gian bắt đầu không được sau thời gian kết thúc!', 'error');
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
