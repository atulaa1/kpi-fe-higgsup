import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {KpiDateFormatter} from '../../../modals/personal-info/kpi-date-formatter';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {User} from '../../../@core/models/user.model';
import {Event} from '../../../@core/models/event.model';
import {UserType} from '../../../@core/models/userType.model';
import {UserService} from '../../../@core/services/user.service';
import {ClubService} from '../../../@core/services/club.service';
import {ActivitiesService} from '../../../@core/services/activities.service';
import {ResponseUserDTO} from '../../../@core/models/responseUserDTO.model';

@Component({
  selector: 'ngx-seminar-activity',
  templateUrl: './seminar-activity.component.html',
  styleUrls: ['./seminar-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class SeminarActivityComponent implements OnInit {
  @Input() dismiss;
  @Input() eventClubInfoCreating;
  @Input() eventClubInfoCreated;
  @Input() groupId: number = null;
  @Output() change = new EventEmitter<any>();
  startTime = {hour: 12, minute: 0o0};
  endTime = {hour: 12, minute: 0o0};
  spinners: boolean = false;
  startDate;
  endDate: NgbDateStruct;
  listUser: Array<User>;
  listCloneUserHost: Array<User>;
  listCloneUserParticipant: Array<User>;
  eventClub: Event = new Event();
  eventName: string = '';
  eventAddress: string = '';
  hostName: string = '';
  listEventUser: Array<UserType> = new Array<UserType>();
  userHostCtrl = new FormControl();
  userParticipantCtrl = new FormControl();
  filteredHostUsers: Observable<Array<User>>;
  filteredParticipantUsers: Observable<Array<User>>;
  userCloneHost: Array<any> = [];
  userCloneParticipant: Array<any> = [];
  separatorKeysCodes: Array<number> = [ENTER, COMMA];


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;


  @ViewChild('userInputHost') userHostInput: ElementRef<HTMLInputElement>;
  @ViewChild('userInputParticipant') userParticipantInput: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService, private clubService: ClubService, private activitiesService: ActivitiesService) {
    this.userHostCtrl = new FormControl();
    this.filteredHostUsers = this.userHostCtrl.valueChanges
      .startWith(null)
      .map(user => user && typeof user === 'object' ? user.fullName : user)
      .map(user => this.filterUsersHost(user));
  }

  // Array Host user tags

  filterUsersHost(val) {
    return val ? this.listCloneUserHost.filter(user => user.fullName.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.listCloneUserHost;
  }

  displayFn(user): string {
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

  displayFnParticipant(user): string {
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
    this.userInput.nativeElement.value = '';
    this.userParticipantCtrl.setValue(null);
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
      }
    });
  }

  closeModal() {
    this.dismiss();
  }
}
