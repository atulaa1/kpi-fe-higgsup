import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {InputFile, InputFileComponent} from 'ngx-input-file';
import {User} from '../../@core/models/user.model';
import {FormControl, FormGroup} from '@angular/forms';
import {PersonalInfoService} from '../../@core/services/personal-info.service';

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

  constructor(private activeModal: NgbActiveModal,
              private personalInfoService: PersonalInfoService) { }

  ngOnInit() {
    // this.getPersonalInfo(); //get personal info of current user in db
    this.currentUser = new User();
    this.currentUser.birthday = '30/02/1997';
    this.currentUser.phoneNumber = '0966969696';
    this.currentUser.address = 'abcxyz';
    this.currentUser.gmail = 'thanhlv@gmail.com';
    this.currentUser.skype = 'thanhlv';
    this.currentUser.yearsOfWork = 3;
    this.userInfoForm = new FormGroup({
      avatar: new FormControl(this.currentUser.avatar),
      birthday: new FormControl(this.currentUser.birthday),
      phoneNumber: new FormControl(this.currentUser.phoneNumber),
      address: new FormControl(this.currentUser.address),
      gmail: new FormControl(this.currentUser.gmail),
      skype: new FormControl(this.currentUser.skype),
      yearsOfWork: new FormControl(this.currentUser.yearsOfWork),
    });
  }

  getPersonalInfo() {
    this.personalInfoService.getPersonalInfo().subscribe((personInfo: User) => this.currentUser = personInfo);
  }

  closeInfoModal() {
      this.activeModal.close();
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
    this.currentUser.phoneNumber = this.userInfoForm.controls.phoneNumber.value;
    this.currentUser.address = this.userInfoForm.controls.address.value;
    this.currentUser.gmail = this.userInfoForm.controls.gmail.value;
    this.currentUser.skype = this.userInfoForm.controls.skype.value;
    this.currentUser.yearsOfWork = this.userInfoForm.controls.yearsOfWork.value;
    this.personalInfoService.updatePersonalInfo(this.currentUser).subscribe((personInfo: User) => this.currentUser = personInfo);
  }
}
