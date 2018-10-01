import {Component, OnInit} from '@angular/core';
import {ManagementLateUsersService} from '../../../@core/services/management-late-users.service';
import {LateInfo} from '../../../@core/models/lateInfo.model';
import {ResponDTOLateInfo} from '../../../@core/models/ResponDTOLateInfo';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'acc-management-late',
  templateUrl: './acc-management-late.component.html',
  styleUrls: ['./acc-management-late.component.scss'],
})
export class AccManagementLateComponent implements OnInit {
  listLateClone: Array<LateInfo>;
  showMsg: boolean = false;
  word: string = '';

  listLateComing: Array<LateInfo>;
  isEditLateComing: boolean = false;
  idLateInfoEdit: number;
  msgConfirmUpdate: string;
  buttonTitle: string;
  lateInfoToEdit: LateInfo;
  newLateComingTime: number;
  errorContent: string;

  constructor(private managementLateService: ManagementLateUsersService,
              private bsModal: NgbModal) {
  }

  ngOnInit() {
    this.managementLateService.getListLate().subscribe(value => {
        this.listLateComing = value.data;
        this.listLateClone = Object.assign([], this.listLateComing);
      },
    );
  }

  uploadImportFile(fileList, content) {
    this.managementLateService.importFileLateComingUser(fileList[0]).subscribe((response: ResponDTOLateInfo<Array<LateInfo>>) => {
      if (response.status_code === 200) {
        this.listLateComing = response.data;
        this.listLateClone = Object.assign([], this.listLateComing);
      } else {
        if (response.errors) {
          let msgColumn = '';
          let msgData = '';
          if (response.errors.findIndex(lateItem => lateItem.errorCode === 911) !== -1) {
            response.errors.forEach(lateItem => {
              if (lateItem.message === 'invalid member name') {
                msgColumn += 'Không tồn tại trường Team member trong tệp tải lên!'
              } else if (lateItem.message === 'invalid email') {
                msgColumn += 'Không tồn tại trường Email trong tệp tải lên!'
              } else if (lateItem.message === 'invalid number of late times') {
                msgColumn += 'Không tồn tại trường Scores trong tệp tải lên!'
              }
              if (response.errors.indexOf(lateItem) !== response.errors.length) {
                msgColumn += '<br/>';
              }
            });
          } else if (response.errors.findIndex(lateItem => lateItem.errorCode === 916) !== -1) {
            response.errors.forEach(lateItem => {
              let arrSplitMsg = lateItem.message.split(' ');
              if (lateItem.message.search(/incorrect email data at line/) > -1) {
                msgData += 'Sai định dạng email tại dòng ' + arrSplitMsg[arrSplitMsg.length - 1];
              } else if (lateItem.message.search(/email not in database at line/) > -1) {
                msgData += 'Không tìm thấy email tại dòng ' + arrSplitMsg[arrSplitMsg.length - 1];
              } else if (lateItem.message.search(/incorrect late times data/) > -1) {
                msgData += 'Sai định dạng số lần đi muộn tại dòng ' + arrSplitMsg[arrSplitMsg.length - 1];
              }
              if (response.errors.indexOf(lateItem) !== response.errors.length) {
                msgData += '<br/>';
              }
            });
          }
          this.errorContent = (msgColumn === '') ? msgData : msgColumn;
          this.bsModal.open(content, {backdrop: 'static', centered: true});
        }
      }
    })
  }

  openEditBoxLateComing(lateInfo: LateInfo) {
    if (this.isEditLateComing !== true) {
      this.isEditLateComing = true;
      this.idLateInfoEdit = lateInfo.id;
      this.newLateComingTime = lateInfo.lateTimes;
    }
  }

  openConfirmUpdateLateComingData(content, lateInfo: LateInfo, updatedLateComingTime) {
    this.lateInfoToEdit = lateInfo;
    this.newLateComingTime = (updatedLateComingTime === '') ? 0 : updatedLateComingTime;
    this.msgConfirmUpdate = 'Bạn có chắc chắn muốn sửa ' + lateInfo.lateTimes + ' buổi đi muộn của ' + lateInfo.user.fullName +
      ' thành ' + this.newLateComingTime + ' không?';
    this.bsModal.open(content, {backdrop: 'static', centered: true});
  }

  updateLateComingData(event) {
    if (event === true) {
      this.managementLateService.updateLateInfo(this.lateInfoToEdit, this.newLateComingTime).subscribe(
        (response: ResponDTOLateInfo<LateInfo>) => {
          if (response.status_code === 200) {
            let updatedLateInfo = response.data;
            let indexToUpdate = this.listLateComing.findIndex(lateItem => lateItem.id === updatedLateInfo.id);
            let indexCloneToUpdate = this.listLateClone.findIndex(lateItem => lateItem.id === updatedLateInfo.id);
            this.listLateComing.splice(indexToUpdate, 1, updatedLateInfo);
            this.listLateClone.splice(indexCloneToUpdate, 1, updatedLateInfo);
            this.isEditLateComing = false;
            this.idLateInfoEdit = null;
          }
        })
    } else {
      this.isEditLateComing = false;
      this.idLateInfoEdit = null;
    }
  }

  inputLateComingTimes(event, content, lateInfo: LateInfo, updatedLateComingTime) {
    if (event.keyCode === 13) {
      this.openConfirmUpdateLateComingData(content, lateInfo, updatedLateComingTime);
    }
    return event.charCode >= 48 && event.charCode <= 57
  }

  searchName(lateInfo) {
    return lateInfo.user.fullName.toUpperCase().indexOf(this.word.toUpperCase()) >= 0;
  }

  searchInfo() {
    this.showMsg = false;
    this.listLateClone = Object.assign([], this.listLateComing);
    this.listLateClone = this.listLateClone.filter(late => this.searchName(late));
    if (this.listLateClone.length === 0) {
      this.showMsg = true;
    }
  }

  handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.searchInfo();
    } else if (this.word === '') {
      this.searchInfo();
    }
  }
}
