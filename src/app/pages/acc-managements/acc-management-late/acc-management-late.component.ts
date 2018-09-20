import {Component, OnInit} from '@angular/core';
import {ManagementLateUsersService} from '../../../@core/services/management-late-users.service';
import {LateInfoAllUsersDTO} from '../../../@core/models/late-info-all-users-dto.model';
import {LateInfo} from '../../../@core/models/late-info.model';

@Component({
  selector: 'acc-management-late',
  templateUrl: './acc-management-late.component.html',
  styleUrls: ['./acc-management-late.component.scss'],
})
export class AccManagementLateComponent implements OnInit {

  lateUsersInfo: Array<LateInfo>;

  constructor(private managementLateService: ManagementLateUsersService) {
  }

  ngOnInit() {
  }

  uploadImportFile(fileList) {
    this.managementLateService.importFileLateComingUser(fileList[0]).subscribe((response: LateInfoAllUsersDTO) => {
      this.lateUsersInfo = response.data;
      console.log(response.data);
    })
    console.log(fileList[0]);
  }
}
