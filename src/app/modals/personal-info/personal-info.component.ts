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
  image: any;
  currentUser: User;
  picture: string;
  avatarImg: string;
  clickCloseCount: number = 0;
  inputFocused: boolean = false;
  closeConfirm: boolean = false;
  submitConfirm: boolean = false;
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
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    if (typeof (this.currentUser.birthday) === 'string') {
      this.currentUser.birthday = new Date(this.currentUser.birthday);
    }
    if (typeof (this.currentUser.dateStartWork) === 'string') {
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
    if (this.fileBase64 !== this.currentUser.avatar ||
      this.convertNgbDateToDate(this.birthday) !== this.currentUser.birthday ||
      this.phoneNumber !== this.currentUser.numberPhone ||
      this.address !== this.currentUser.address ||
      this.secondaryEmail !== this.currentUser.gmail ||
      this.skype !== this.currentUser.skype ||
      this.convertNgbDateToDate(this.dpStartWorkDay) !== this.currentUser.dateStartWork) {
      return true;
    }
    return false;
  }

  closeInfoModal() {
    this.emailWarning = null;
    if (!this.isInfoChanged()) {
      this.activeModal.close();
      this.submitConfirm = false;
    } else {
      this.clickCloseCount += 1;
      if (this.clickCloseCount === 1) {
        this.closeConfirm = true;
        this.closeWarningMsg = MessageConstant.MSG_WARNING_CHANGE_NOT_SAVE;
      } else if (this.clickCloseCount === 2) {
        this.activeModal.close();
        this.clickCloseCount = 0;
        this.closeConfirm = false;
        this.inputFocused = false;
        this.submitConfirm = false;
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
      userTemp.birthday = isNull(this.birthday) ? null : this.convertNgbDateToDate(this.birthday);
      userTemp.numberPhone = this.phoneNumber;
      userTemp.address = this.address;
      userTemp.gmail = this.secondaryEmail;
      userTemp.skype = this.skype;
      userTemp.dateStartWork = isNull(this.dpStartWorkDay) ? null : this.convertNgbDateToDate(this.dpStartWorkDay);
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
      this.inputFocused = false;
      this.closeConfirm = false;
      this.submitConfirm = true;
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
    return new Date(ngbDate.year, ngbDate.month, ngbDate.day);
  }

  deleteOnly(event) {
    if (event.keyCode !== 8 && event.keyCode !== 46) {
      event.preventDefault();
    }
  }
}
