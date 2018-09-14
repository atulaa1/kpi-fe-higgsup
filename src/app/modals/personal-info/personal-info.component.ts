import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {InputFile} from 'ngx-input-file';
import {User} from '../../@core/models/user.model';
import {UserService} from '../../@core/services/user.service';
import {MessageConstant} from '../../@core/glossary/message.constant';
import {CookieService} from 'ngx-cookie-service';
import {ResponseDTO} from '../../@core/models/responseDTO.model';
import {isNull} from 'util';
import {KpiDateFormatter} from './kpi-date-formatter';

@Component({
  selector: 'ngx-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}]
})
export class PersonalInfoComponent implements OnInit {

  dpStartWorkDay: NgbDateStruct;
  currentUser: User;
  clickCloseCount: number = 0;
  closeConfirm: boolean = false;
  submitDoneMsg: string;
  closeWarningMsg: string;
  emailWarning: string;
  avatar: string;
  birthday: NgbDateStruct;
  phoneNumber: string;
  address: string;
  secondaryEmail: string;
  skype: string;
  private fileBase64: string = null;
  avatarActive: boolean = true;
  maxBirthday: NgbDateStruct;
  minStartWorkDate: NgbDateStruct;

  constructor(private activeModal: NgbActiveModal,
              private cookieService: CookieService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.userService.currentUser.subscribe((user: User) => this.currentUser = user);
    if (typeof (this.currentUser.birthday) === 'string' && this.currentUser.birthday !== null) {
      this.currentUser.birthday = new Date(this.currentUser.birthday);
    }
    if (typeof (this.currentUser.dateStartWork) === 'string' && this.currentUser.dateStartWork !== null) {
      this.currentUser.dateStartWork = new Date(this.currentUser.dateStartWork);
    }
    this.fileBase64 = this.currentUser.avatar;
    this.birthday = this.convertDatetoNgbDateStruct(this.currentUser.birthday);
    this.phoneNumber = this.currentUser.numberPhone;
    this.address = this.currentUser.address;
    this.secondaryEmail = this.currentUser.gmail;
    this.skype = this.currentUser.skype;
    this.dpStartWorkDay = this.convertDatetoNgbDateStruct(this.currentUser.dateStartWork);
    this.avatar = this.currentUser.avatar;
    let now = new Date();
    this.maxBirthday = {
      day: 31,
      month: 12,
      year: now.getFullYear() - 16,
    }
    this.minStartWorkDate = {
      day: 1,
      month: 9,
      year: 2015,
    }
  }

  isInfoChanged(): boolean {
    if (this.birthday !== null && this.currentUser.birthday !== null &&
      this.dpStartWorkDay !== null && this.currentUser.dateStartWork !== null) {
      if (this.fileBase64 !== this.currentUser.avatar ||
        new Date(this.birthday.year, this.birthday.month - 1, this.birthday.day) !== this.currentUser.birthday ||
        this.phoneNumber !== this.currentUser.numberPhone ||
        this.address !== this.currentUser.address ||
        this.secondaryEmail !== this.currentUser.gmail ||
        this.skype !== this.currentUser.skype ||
        new Date(this.dpStartWorkDay.year, this.dpStartWorkDay.month - 1, this.dpStartWorkDay.day) !== this.currentUser.dateStartWork) {
        return true;
      }
    } else if ((this.birthday === null && this.currentUser.birthday !== null) ||
      (this.birthday !== null && this.currentUser.birthday === null) ||
      (this.dpStartWorkDay === null && this.currentUser.dateStartWork !== null) ||
      (this.dpStartWorkDay !== null && this.currentUser.dateStartWork === null)) {
      return true;
    }
    return false;
  }

  closeInfoModal() {
    this.emailWarning = null;
    if (!this.isInfoChanged()) {
      this.activeModal.close();
    } else {
      this.clickCloseCount += 1;
      if (this.clickCloseCount === 1) {
        this.closeConfirm = true;
        this.closeWarningMsg = MessageConstant.MSG_WARNING_CHANGE_NOT_SAVE;
      } else if (this.clickCloseCount === 2) {
        this.activeModal.close();
        this.clickCloseCount = 0;
        this.closeConfirm = false;
      }
    }
  }

  saveAvatarImg(inputFile: InputFile) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(inputFile.file);
    reader.onload = () => {
      this.fileBase64 = reader.result;
      this.avatarActive = false;
    };

  }


  saveChange() {
    if (!this.isValidatedEmail()) {
      this.emailWarning = MessageConstant.MSG_INVALID_EMAIL;
    } else {
      let userTemp = this.currentUser;
      userTemp.avatar = this.fileBase64;
      userTemp.birthday = isNull(this.birthday) ?
        null : new Date(this.birthday.year, this.birthday.month - 1, this.birthday.day);
      userTemp.numberPhone = this.phoneNumber;
      userTemp.address = this.address;
      userTemp.gmail = this.secondaryEmail;
      userTemp.skype = this.skype;
      userTemp.dateStartWork = isNull(this.dpStartWorkDay) ?
        null : new Date(this.dpStartWorkDay.year, this.dpStartWorkDay.month, this.dpStartWorkDay.day);
      userTemp.username = this.cookieService.get('username');
      this.userService.updatePersonalInfo(userTemp).subscribe(
        (response: ResponseDTO) => {
          this.currentUser.avatar = response.data.avatar;
          this.currentUser.birthday = new Date(response.data.birthday);
          this.currentUser.numberPhone = response.data.numberPhone;
          this.currentUser.address = response.data.address;
          this.currentUser.gmail = response.data.gmail;
          this.currentUser.skype = response.data.skype;
          this.currentUser.dateStartWork = new Date(response.data.dateStartWork);
          this.submitDoneMsg = MessageConstant.MSG_SAVE_SUCCESSFUL;
          this.emailWarning = null;
          setTimeout(() => {
            this.submitDoneMsg = '';
          }, 2000);
        });
      this.closeConfirm = false;
      this.clickCloseCount = 0;
    }
  }

  isValidatedEmail(): boolean {
    const pattern = new RegExp(/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/);
    return pattern.test(this.secondaryEmail);
  }

  convertDatetoNgbDateStruct(date: Date): NgbDateStruct {
    return date ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : null;
  }
}
