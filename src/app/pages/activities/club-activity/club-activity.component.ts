import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
import {ActivitiesConfirmService} from '../../../@core/services/activities-confirm.service';


@Component({
  selector: 'ngx-club-activity',
  templateUrl: './club-activity.component.html',
  styleUrls: ['./club-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class ClubActivityComponent implements OnInit {

  @Input() dismiss;
  @Input() transmissionActivities;
  startTime = {hour: 12, minute: 0o0, second: 0o0};
  endTime = {hour: 12, minute: 0o0, second: 0o0};
  spinners: boolean = false;
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  listUser: Array<User>;
  listUserName: Array<string> = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: Array<number> = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: Observable<Array<string>>;
  usernames: Array<string> = [];

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService, private activitiesConfirm: ActivitiesConfirmService) {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((filteredUser: string | null) => filteredUser ? this._filter(filteredUser) : this.listUserName.slice()));
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.usernames.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.usernames.indexOf(fruit);

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
    /*this.activitiesConfirm.currentMessage.subscribe(message => this.message = message);*/
  }

  closeModal() {
    this.dismiss();
  }

  onGetUser() {

  }

}
