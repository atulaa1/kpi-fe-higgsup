import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {InputFile, InputFileComponent} from 'ngx-input-file';
import {User} from '../../@core/models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../@core/services/user.service';
import {MessageConstant} from '../../@core/glossary/message.constant';

@Component({
  selector: 'ngx-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {

  private fileBase64: string;

  image: any;
  currentUser: User;
  userInfoForm: FormGroup;
  picture: string;
  avatarImg: string;
  clickCloseCount: number = 0;
  inputFocused: boolean = false;
  closeConfirm: boolean = false;
  submitConfirm: boolean = false;
  submitDoneMsg: string;
  closeWarningMsg: string;

  constructor(private activeModal: NgbActiveModal,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.userInfoForm = new FormGroup({
      birthday: new FormControl(this.currentUser.birthday),
      phoneNumber: new FormControl(this.currentUser.numberPhone),
      address: new FormControl(this.currentUser.address),
      gmail: new FormControl(this.currentUser.gmail, Validators.pattern(/^[a-z0-9](\.?[a-z0-9])*@gmail.com$/)),
      skype: new FormControl(this.currentUser.skype),
      yearsOfWork: new FormControl(this.currentUser.yearWork),
      submitMessage: new FormControl(MessageConstant.MSG7.toString()),
    });
  }

  onFocus() {
    this.inputFocused = true;
  }

  closeInfoModal() {
    if (this.inputFocused === false) {
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

  onSubmit() {
    this.currentUser.avatar = this.fileBase64;
    this.currentUser.birthday = this.userInfoForm.controls.birthday.value;
    this.currentUser.numberPhone = this.userInfoForm.controls.phoneNumber.value;
    this.currentUser.address = this.userInfoForm.controls.address.value;
    this.currentUser.gmail = this.userInfoForm.controls.gmail.value;
    this.currentUser.skype = this.userInfoForm.controls.skype.value;
    this.currentUser.yearWork = this.userInfoForm.controls.yearsOfWork.value;
    this.userService.updatePersonalInfo(this.currentUser).subscribe(
      (personInfo: User) => {
        this.currentUser = personInfo;
      });
    this.submitDoneMsg = MessageConstant.MSG7;
    setTimeout(() => {
      this.submitDoneMsg = '';
    }, 2000);
    this.inputFocused = false;
    this.closeConfirm = false;
    this.submitConfirm = true;
    this.clickCloseCount = 0;
  }
}
