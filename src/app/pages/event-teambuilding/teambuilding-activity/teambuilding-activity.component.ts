import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbDateParserFormatter, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {KpiDateFormatter} from '../../../modals/personal-info/kpi-date-formatter';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {User} from '../../../@core/models/user.model';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {UserService} from '../../../@core/services/user.service';
import {ResponseUserDTO} from '../../../@core/models/responseUserDTO.model';
import {Event} from '../../../@core/models/event.model';
import {UserType} from '../../../@core/models/userType.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'ngx-teambuilding-activity',
  templateUrl: './teambuilding-activity.component.html',
  styleUrls: ['./teambuilding-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class TeambuildingActivityComponent implements OnInit {
  spinners: boolean = false;
  actionDate;
  actionTime;
  actionDay;
  listUser: Array<User>;
  listCloneUserHost: Array<User>;
  listCloneUserFirstPrize: Array<User>;
  listCloneUserSecondPrize: Array<User>;
  listCloneUserThirdPrize: Array<User>;
  creator: string = '';
  userCtrl = new FormControl();
  userFirstPrizeCtrl = new FormControl();
  userSecondPrizeCtrl = new FormControl();
  userThirdPrizeCtrl = new FormControl();
  filteredUsers: Observable<Array<User>>;
  filteredHostUsers: Observable<Array<User>>;
  listEventUser: Array<UserType> = new Array<UserType>();

  userDefault: User = new User();
  userCloneHost: Array<any> = [];
  userCloneFirstPrize: Array<any> = [];
  userCloneSecondPrize: Array<any> = [];
  userCloneThirdPrize: Array<any> = [];
  separatorKeysCodes: Array<number> = [ENTER, COMMA];


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  alert: boolean = false;


  @ViewChild('userHostInput') userHostInput: ElementRef<HTMLInputElement>;
  @ViewChild('userFirstPrizeInput') userFirstPrizeInput: ElementRef<HTMLInputElement>;
  @ViewChild('userSecondPrizeInput') userSecondPrizeInput: ElementRef<HTMLInputElement>;
  @ViewChild('userThirdPrizeInput') userThirdPrizeInput: ElementRef<HTMLInputElement>;

  constructor(private activeModal: NgbActiveModal, private userService: UserService) {
    // map Object type for Host
    this.userCtrl = new FormControl();
    this.filteredUsers = this.userCtrl.valueChanges
      .startWith(null)
      .map(user => user && typeof user === 'object' ? user.fullName : user);
      // .map(user => this.filterUsersHost(user));
  }

  ngOnInit() {
    const users: Array<User> = [];
    this.userService.getUsers().subscribe((response: ResponseUserDTO) => {
      if (response.status_code === 200) {
        this.listUser = response.data;
        this.listCloneUserHost = Object.assign([], this.listUser).filter(user => user.username !== this.creator);
        this.listCloneUserFirstPrize = Object.assign([], this.listUser).filter(user => user.username !== this.creator);
        this.listCloneUserSecondPrize = Object.assign([], this.listUser).filter(user => user.username !== this.creator);
        this.listCloneUserThirdPrize = Object.assign([], this.listUser).filter(user => user.username !== this.creator);
        users.forEach(value => {
          const index = this.listUser.map(valueMap => valueMap.username).indexOf(value.username);
          if (index >= 0) {
            this.listUser.splice(index, 1);
          }
        });
        this.filteredUsers = this.setFilteredUsers(this.listUser);
        this.filteredHostUsers = this.setFilteredUsers(this.listUser);
      }
    });
  }

  onAddEventTeamBuilding() {
    this.actionDay = this.convertNgbDateStructToString(this.actionDate) + ' ' + this.convertNgbtimeStructToString(this.actionTime);
    // this.userCloneHost.forEach(user => this.)
    for (let i = 0; i < this.userCloneHost.length; i++) {
      const userMem: User = new User();
      const eventUser: UserType = new UserType();
      userMem.username = this.userCloneHost[i].username;

        eventUser.user = userMem;
        eventUser.type = 1;
        this.listEventUser.push(eventUser);
    }
  }

  closeModal() {
    this.activeModal.close();
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

    this.userCtrl.setValue(null);
  }

  removeHost(fullName, i): void {
    let users: Array<User> = [];
    this.filteredHostUsers.subscribe(value => users = value.filter(value1 => value1));
    users.push(Object.assign(this.userCloneHost[i]));
    this.filteredHostUsers = this.setFilteredUsers(users);
    this.userCloneHost.splice(i, 1);
  }

  selectedHost(event: MatAutocompleteSelectedEvent): void {
    this.userCloneHost.push(event.option.value);

    let users: Array<User> = [];

    this.filteredHostUsers.subscribe(value => users = value.filter(value1 => value1.username !== event.option.value.username));
    this.filteredHostUsers = this.setFilteredUsers(users);

    this.userHostInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  // Array FirstPrize user tags

  filterUsersFirstPrize(val) {
    return val ? this.listCloneUserFirstPrize.filter(user => user.fullName.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.listCloneUserFirstPrize;
  }

  displayFirstPrizeFn(user): string {
    return user ? user.fullName : user;
  }

  addFirstPrize(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add user
    if ((value || '').trim()) {
      this.userCloneFirstPrize.push({
        fullname: value,
        username: value,
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userFirstPrizeCtrl.setValue(null);
  }

  removeFirstPrize(fullName, i): void {
    let users: Array<User> = [];
    this.filteredUsers.subscribe(value => users = value.filter(value1 => value1));
    users.push(Object.assign(this.userCloneFirstPrize[i]));
    this.filteredUsers = this.setFilteredUsers(users);
    this.userCloneFirstPrize.splice(i, 1);
  }

  selectedFirstPrize(event: MatAutocompleteSelectedEvent): void {
    this.userCloneFirstPrize.push(event.option.value);
    let users: Array<User> = [];
    this.filteredUsers.subscribe(value => users = value.filter(value1 => value1.username !== event.option.value.username));
    this.filteredUsers = this.setFilteredUsers(users);
    this.userFirstPrizeInput.nativeElement.value = '';
    this.userFirstPrizeCtrl.setValue(null);
  }

  // Array SecondPrize user tags

  filterUsersSecondPrize(val) {
    return val ? this.listCloneUserSecondPrize.filter(user => user.fullName.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.listCloneUserSecondPrize;
  }

  displaySecondPrizeFn(user): string {
    return user ? user.fullName : user;
  }

  addSecondPrize(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add user
    if ((value || '').trim()) {
      this.userCloneSecondPrize.push({
        fullname: value,
        username: value,
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userSecondPrizeCtrl.setValue(null);
  }

  removeSecondPrize(fullName, i): void {
    let users: Array<User> = [];
    this.filteredUsers.subscribe(value => users = value.filter(value1 => value1));
    users.push(Object.assign(this.userCloneSecondPrize[i]));
    this.filteredUsers = this.setFilteredUsers(users);
    this.userCloneSecondPrize.splice(i, 1);
  }

  selectedSecondPrize(event: MatAutocompleteSelectedEvent): void {
    this.userCloneSecondPrize.push(event.option.value);

    let users: Array<User> = [];
    this.filteredUsers.subscribe(value => users = value.filter(value1 => value1.username !== event.option.value.username));
    this.filteredUsers = this.setFilteredUsers(users);
    this.userSecondPrizeInput.nativeElement.value = '';
    this.userSecondPrizeCtrl.setValue(null);
  }

  // Array ThirdPrize user tags

  filterUsersThirdPrize(val) {
    return val ? this.listCloneUserThirdPrize.filter(user => user.fullName.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.listCloneUserThirdPrize;
  }

  displayThirdPrizeFn(user): string {
    return user ? user.fullName : user;
  }

  addThirdPrize(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add user
    if ((value || '').trim()) {
      this.userCloneThirdPrize.push({
        fullname: value,
        username: value,
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userThirdPrizeCtrl.setValue(null);
  }

  removeThirdPrize(fullName, i): void {
    let users: Array<User> = [];
    this.filteredUsers.subscribe(value => users = value.filter(value1 => value1));
    users.push(Object.assign(this.userCloneThirdPrize[i]));
    this.filteredUsers = this.setFilteredUsers(users);
    this.userCloneThirdPrize.splice(i, 1);
  }

  selectedThirdPrize(event: MatAutocompleteSelectedEvent): void {
    this.userCloneThirdPrize.push(event.option.value);

    let users: Array<User> = [];
    this.filteredUsers.subscribe(value => users = value.filter(value1 => value1.username !== event.option.value.username));
    this.filteredUsers = this.setFilteredUsers(users);
    this.userThirdPrizeInput.nativeElement.value = '';
    this.userThirdPrizeCtrl.setValue(null);
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
}
