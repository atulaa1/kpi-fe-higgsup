import {Component, OnInit} from '@angular/core';
import {ManagementLateUsersService} from '../../../@core/services/management-late-users.service';
import {LateInfo} from '../../../@core/models/lateInfo.model';
import {ResponDTOLateInfo} from '../../../@core/models/ResponDTOLateInfo';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';

@Component({
  selector: 'acc-management-late',
  templateUrl: './acc-management-late.component.html',
  styleUrls: ['./acc-management-late.component.scss'],
})
export class AccManagementLateComponent implements OnInit {

  listLateComing: Array<LateInfo>;
  isEditLateComing: boolean = false;
  idLateInfoEdit: number;
  msgConfirmUpdate: string;
  closeResult: boolean;
  buttonTitle: string;
  lateInfoToEdit: LateInfo;
  newLateComingTime: number;

  constructor(private managementLateService: ManagementLateUsersService,
              private bsModal: NgbModal) {
  }

  ngOnInit() {
    this.managementLateService.getListLate().subscribe(value => {
        this.listLateComing = value.data;
      },
    );
  }

  uploadImportFile(fileList) {
    this.managementLateService.importFileLateComingUser(fileList[0]).subscribe((response: ResponDTOLateInfo<Array<LateInfo>>) => {
      if (response.status_code === 200) {
        this.listLateComing = response.data;
      } else {
        if (response.errors) {
          let msg = '';
          if (response.errors.findIndex(lateItem => lateItem.errorCode === 911) !== -1) {
            swal('Cảnh báo!', 'Tên nhân viên không hợp lệ!\nEmail không hợp lệ!\nSố buổi đi muộn không hợp lệ!', 'warning');
          } else if (response.errors.findIndex(lateItem => lateItem.errorCode === 916) !== -1) {
            response.errors.forEach(lateItem => {
              if (response.errors.indexOf(lateItem) === response.errors.length) {
                let arrSplitMsg = lateItem.message.split(' ');
                if (lateItem.message.search(/incorrect (email|late times) data at line/) > -1) {
                  msg += 'Dữ liệu sai tại dòng ' + arrSplitMsg[arrSplitMsg.length - 1];
                } else if (lateItem.message.search(/email not in database at line/) > -1) {
                  msg += 'Không tìm thấy email tại dòng ' + arrSplitMsg[arrSplitMsg.length - 1];
                }
              } else {
                let arrSplitMsg = lateItem.message.split(' ');
                if (lateItem.message.search(/incorrect (email|late times) data at line/) > -1) {
                  msg += 'Dữ liệu sai tại dòng ' + arrSplitMsg[arrSplitMsg.length - 1] + '\n';
                } else if (lateItem.message.search(/email not in database at line/) > -1) {
                  msg += 'Không tìm thấy email tại dòng ' + arrSplitMsg[arrSplitMsg.length - 1] + '\n';
                }
              }
            })
            swal('Cảnh báo!', msg, 'warning');
          }
        }
      }
    })
  }

  openEditBoxLateComing(lateInfo: LateInfo) {
    this.isEditLateComing = true;
    this.idLateInfoEdit = lateInfo.id;
    this.newLateComingTime = lateInfo.lateTimes;
  }

  openConfirmUpdateLateComingData(content, lateInfo: LateInfo, updatedLateComingTime) {
    this.lateInfoToEdit = lateInfo;
    console.log('abc:', updatedLateComingTime);
    this.newLateComingTime = updatedLateComingTime === ' ' ? 0 : updatedLateComingTime;
    this.msgConfirmUpdate = 'Bạn có chắc chắn muốn sửa ' + lateInfo.lateTimes + ' buổi đi muộn của ' + lateInfo.user.fullName +
      ' thành ' + updatedLateComingTime + ' không?';
    this.bsModal.open(content, {backdrop: 'static', centered: true});
  }

  updateLateComingData(event) {
    if (event === true) {
      this.managementLateService.updateLateInfo(this.lateInfoToEdit, this.newLateComingTime).subscribe(
        (response: ResponDTOLateInfo<LateInfo>) => {
          if (response.status_code === 200) {
            let updatedLateInfo = response.data;
            let indexToUpdate = this.listLateComing.findIndex(lateItem => lateItem.id === updatedLateInfo.id)
            this.listLateComing.splice(indexToUpdate, 1, updatedLateInfo);
            this.isEditLateComing = false;
            this.idLateInfoEdit = null;
          }
        })
    } else {
      this.isEditLateComing = false;
      this.idLateInfoEdit = null;
    }
  }

  blockInputNagativeNumber(event) {
    return event.charCode >= 48 && event.charCode <= 57
  }
}
