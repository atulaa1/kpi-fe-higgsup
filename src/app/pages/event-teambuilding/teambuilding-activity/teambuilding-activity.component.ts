import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {KpiDateFormatter} from '../../../modals/personal-info/kpi-date-formatter';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {User} from '../../../@core/models/user.model';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {UserService} from '../../../@core/services/user.service';
import {ResponseUserDTO} from '../../../@core/models/responseUserDTO.model';
import {UserType} from '../../../@core/models/userType.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Event} from '../../../@core/models/event.model';
import {Common} from '../../../@core/glossary/common.constant';

@Component({
  selector: 'ngx-teambuilding-activity',
  templateUrl: './teambuilding-activity.component.html',
  styleUrls: ['./teambuilding-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class TeambuildingActivityComponent implements OnInit {
  spinners: boolean = false;
  actionDate = null;
  actionTime = null;
  actionDay = null;
  teambuildingAddress: string;
  listUser: Array<User>;
  listCloneUserHost: Array<User>;
  listCloneUserFirstPrize: Array<User>;
  listCloneUserSecondPrize: Array<User>;
  listCloneUserThirdPrize: Array<User>;
  creator: string = '';
  teambuildingName: string = null;
  userCtrl = new FormControl();
  userFirstPrizeCtrl = new FormControl();
  userSecondPrizeCtrl = new FormControl();
  userThirdPrizeCtrl = new FormControl();
  filteredUsers: Observable<Array<User>>;
  filteredHostUsers: Observable<Array<User>>;
  listEventUser: Array<UserType> = new Array<UserType>();

  userCloneHost: Array<any> = [];
  userCloneFirstPrize: Array<any> = [];
  userCloneSecondPrize: Array<any> = [];
  userCloneThirdPrize: Array<any> = [];
  separatorKeysCodes: Array<number> = [ENTER, COMMA];

  @Output() addedTeambuilding = new EventEmitter<Event>();
  @Input() dismiss;
  @Input() teambuildingView: Event = null;

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
        if (this.teambuildingView !== undefined && this.teambuildingView !== null) {
          this.teambuildingName = this.teambuildingView.name;
          const arrDate = this.teambuildingView.beginDate.split(' ');
          this.actionDate = this.convertDatetoNgbDateStruct(new Date(this.reverse(arrDate[0])));
          this.actionTime = this.convertTimeStringtoNgbTimeStruct(arrDate[1]);
          this.teambuildingAddress = this.teambuildingView.address;
          for (let i = 0; i < this.teambuildingView.eventUserList.length; i++) {
            if (this.teambuildingView.eventUserList[i].type === Common.ORGANIZER) {
              const arrUser = this.listUser.filter(user => user.username === this.teambuildingView.eventUserList[i].user.username);
              this.userCloneHost.push(arrUser[0]);
            } else if (this.teambuildingView.eventUserList[i].type === Common.FIRST_PRIZE) {
              const arrUser = this.listUser.filter(user => user.username === this.teambuildingView.eventUserList[i].user.username);
              this.userCloneFirstPrize.push(arrUser[0]);
            } else if (this.teambuildingView.eventUserList[i].type === Common.SECOND_PRIZE) {
              const arrUser = this.listUser.filter(user => user.username === this.teambuildingView.eventUserList[i].user.username);
              this.userCloneSecondPrize.push(arrUser[0]);
            } else if (this.teambuildingView.eventUserList[i].type === Common.THIRD_PRIZE) {
              const arrUser = this.listUser.filter(user => user.username === this.teambuildingView.eventUserList[i].user.username);
              this.userCloneThirdPrize.push(arrUser[0]);
            }
          }
        }
        this.filteredUsers = this.setFilteredUsers(this.listUser);
        this.filteredHostUsers = this.setFilteredUsers(this.listUser);
      }
    });
  }

  addEventTeamBuilding() {
    if (this.teambuildingName !== null && this.teambuildingName !== '' && this.actionDate !== null && this.actionDate !== '' &&
      this.actionTime !== '' && this.userCloneHost.length !== 0 && this.userCloneFirstPrize.length !== 0 &&
      this.userCloneSecondPrize.length !== 0 && this.userCloneThirdPrize.length !== 0) {
      const teambuilding = new Event();
      this.actionDay = this.convertNgbDateStructToString(this.actionDate) + ' ' + this.convertNgbtimeStructToString(this.actionTime);

      for (let i = 0; i < this.userCloneHost.length; i++) {
        const userMem: User = new User();
        const eventUser: UserType = new UserType();
        userMem.username = this.userCloneHost[i].username;

        eventUser.user = userMem;
        eventUser.type = Common.ORGANIZER;
        this.listEventUser.push(eventUser);
      }

      for (let i = 0; i < this.userCloneFirstPrize.length; i++) {
        const userMem: User = new User();
        const eventUser: UserType = new UserType();
        userMem.username = this.userCloneFirstPrize[i].username;

        eventUser.user = userMem;
        eventUser.type = Common.FIRST_PRIZE;
        this.listEventUser.push(eventUser);
      }

      for (let i = 0; i < this.userCloneSecondPrize.length; i++) {
        const userMem: User = new User();
        const eventUser: UserType = new UserType();
        userMem.username = this.userCloneSecondPrize[i].username;

        eventUser.user = userMem;
        eventUser.type = Common.SECOND_PRIZE;
        this.listEventUser.push(eventUser);
      }

      for (let i = 0; i < this.userCloneThirdPrize.length; i++) {
        const userMem: User = new User();
        const eventUser: UserType = new UserType();
        userMem.username = this.userCloneThirdPrize[i].username;

        eventUser.user = userMem;
        eventUser.type = Common.THIRD_PRIZE;
        this.listEventUser.push(eventUser);
      }

      teambuilding.name = this.teambuildingName;
      teambuilding.beginDate = this.actionDay;
      teambuilding.eventUserList = this.listEventUser;
      this.addedTeambuilding.emit(teambuilding);
      this.dismiss();
    } else {
      this.alert = true;
    }
  }

  closeModal() {
    this.teambuildingView = null;
    this.dismiss();
  }

  addHost(event: MatChipInputEvent): void {
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

  addFirstPrize(event: MatChipInputEvent): void {
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

  addSecondPrize(event: MatChipInputEvent): void {
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

  addThirdPrize(event: MatChipInputEvent): void {
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
    return time ? {hour: parseInt(time.slice(0, 2), 10), minute: parseInt(time.slice(3, 5), 10)} : null;
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
