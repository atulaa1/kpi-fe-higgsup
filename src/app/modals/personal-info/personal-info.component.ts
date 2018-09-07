import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {InputFile} from 'ngx-input-file';
import {User} from '../../@core/models/user.model';
import {UserService} from '../../@core/services/user.service';
import {MessageConstant} from '../../@core/glossary/message.constant';
import {CookieService} from 'ngx-cookie-service';
import {ResponseDTO} from '../../@core/models/responseDTO.model';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

@Component({
  selector: 'ngx-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {

  private fileBase64: string = null;
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
  birthday: string;
  phoneNumber: string;
  address: string;
  secondaryEmail: string;
  skype: string;
  yearsOfWork: number;
  toDate: NgbDate;

  constructor(private activeModal: NgbActiveModal,
              private cookieService: CookieService,
              private calendar: NgbCalendar,
              private userService: UserService) {

  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.fileBase64 = this.currentUser.avatar;
    this.birthday = this.currentUser.birthday;
    this.phoneNumber = this.currentUser.numberPhone;
    this.address = this.currentUser.address;
    this.secondaryEmail = this.currentUser.gmail;
    this.skype = this.currentUser.skype;
    this.dpStartWorkDay = new NgbDate(this.currentUser.dateStartWork.getFullYear(),
      this.currentUser.dateStartWork.getMonth() + 1, this.currentUser.dateStartWork.getDay());
  }

  isInfoChanged(): boolean {
    if (this.fileBase64 !== this.currentUser.avatar || this.birthday !== this.currentUser.birthday ||
      this.phoneNumber !== this.currentUser.numberPhone || this.address !== this.currentUser.address ||
      this.secondaryEmail !== this.currentUser.gmail || this.skype !== this.currentUser.skype ||
      this.dpStartWorkDay.year !== this.currentUser.dateStartWork.getFullYear() ||
      this.dpStartWorkDay.month !== this.currentUser.dateStartWork.getMonth() + 1 ||
      this.dpStartWorkDay.day !== this.currentUser.dateStartWork.getDay()) {
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
        this.closeWarningMsg = MessageConstant.MSG6;
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
    };

  }

  saveChange() {
    if (!this.isValidatedEmail()) {
      this.emailWarning = MessageConstant.MSG14;
    } else {
      let userTemp = this.currentUser;
      userTemp.avatar = this.fileBase64;
      userTemp.birthday = this.birthday;
      userTemp.numberPhone = this.phoneNumber;
      userTemp.address = this.address;
      userTemp.gmail = this.secondaryEmail;
      userTemp.skype = this.skype;
      // userTemp.dateStartWork = this.dpStartWorkDay;
      userTemp.username = this.cookieService.get('username');
      this.userService.updatePersonalInfo(userTemp).subscribe(
        (response: ResponseDTO) => {
          this.currentUser.avatar = response.data.avatar;
          this.currentUser.birthday = response.data.birthday;
          this.currentUser.numberPhone = response.data.numberPhone;
          this.currentUser.address = response.data.address;
          this.currentUser.gmail = response.data.gmail;
          this.currentUser.skype = response.data.skype;
          this.currentUser.dateStartWork = response.data.dateStartWork;
          this.submitDoneMsg = MessageConstant.MSG7;
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
    const pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return pattern.test(this.secondaryEmail);
  }
}
