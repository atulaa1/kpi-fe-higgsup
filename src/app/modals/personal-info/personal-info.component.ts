import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {InputFile} from 'ngx-input-file';
import {User} from '../../@core/models/user.model';
import {UserService} from '../../@core/services/user.service';
import {MessageConstant} from '../../@core/glossary/message.constant';
import {CookieService} from 'ngx-cookie-service';
import {ResponseDTO} from '../../@core/models/responseDTO.model';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import {isNull} from 'util';

@Component({
  selector: 'ngx-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {

  dpStartWorkDay: NgbDate;
  currentUser: User;
  clickCloseCount: number = 0;
  closeConfirm: boolean = false;
  submitDoneMsg: string;
  closeWarningMsg: string;
  emailWarning: string;
  avatar: string;
  birthday: NgbDate;
  phoneNumber: string;
  address: string;
  secondaryEmail: string;
  skype: string;
  private fileBase64: string = null;
  avatarActive: boolean = true;

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
    this.birthday = this.convertDateToNgbDate(this.currentUser.birthday);
    this.phoneNumber = this.currentUser.numberPhone;
    this.address = this.currentUser.address;
    this.secondaryEmail = this.currentUser.gmail;
    this.skype = this.currentUser.skype;
    this.dpStartWorkDay = this.convertDateToNgbDate(this.currentUser.dateStartWork);
    this.avatar = this.currentUser.avatar;
  }

  isInfoChanged(): boolean {
    if (this.birthday !== null && this.currentUser.birthday !== null &&
      this.dpStartWorkDay !== null && this.currentUser.dateStartWork !== null) {
      if (this.fileBase64 !== this.currentUser.avatar ||
        this.birthday.year !== this.currentUser.birthday.getFullYear() ||
        this.birthday.month !== this.currentUser.birthday.getMonth() + 1 ||
        this.birthday.day !== this.currentUser.birthday.getDate() ||
        this.phoneNumber !== this.currentUser.numberPhone ||
        this.address !== this.currentUser.address ||
        this.secondaryEmail !== this.currentUser.gmail ||
        this.skype !== this.currentUser.skype ||
        this.dpStartWorkDay.year !== this.currentUser.dateStartWork.getFullYear() ||
        this.dpStartWorkDay.month !== this.currentUser.dateStartWork.getMonth() + 1 ||
        this.dpStartWorkDay.day !== this.currentUser.dateStartWork.getDate()) {
        return true;
      }
    } else if ((this.birthday !== null || this.currentUser.birthday !== null) ||
      (this.dpStartWorkDay !== null || this.currentUser.dateStartWork !== null)) {
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
      const userTemp = this.currentUser;
      userTemp.avatar = this.fileBase64;
      userTemp.birthday = isNull(this.birthday) ? null : this.convertNgbDateToDate(this.birthday);
      userTemp.numberPhone = this.phoneNumber;
      userTemp.address = this.address;
      userTemp.gmail = this.secondaryEmail;
      userTemp.skype = this.skype;
      userTemp.dateStartWork = isNull(this.dpStartWorkDay) ? null : this.convertNgbDateToDate(this.dpStartWorkDay);
      userTemp.username = this.currentUser.username;
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

  convertDateToNgbDate(date: Date): NgbDate {
    if (isNull(date)) {
      return null;
    }
    return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  convertNgbDateToDate(ngbDate: NgbDate): Date {
    if (isNull(ngbDate)) {
      return null;
    }
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }
}
