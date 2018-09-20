import {Component, OnInit} from '@angular/core';
import {ManagementLateUsersService} from '../../../@core/services/management-late-users.service';
import {LateInfoAllUsersDTO} from '../../../@core/models/late-info-all-users-dto.model';
import {LateInfo} from '../../../@core/models/late-info.model';
import {ManagementTolateService} from '../../../@core/services/management-tolate.service';
import {LateInfo} from '../../../@core/models/lateInfo.model';

@Component({
  selector: 'acc-management-late',
  templateUrl: './acc-management-late.component.html',
  styleUrls: ['./acc-management-late.component.scss'],
})
export class AccManagementLateComponent implements OnInit {
  listLate: Array<LateInfo>;

  constructor(private managementTolateService: ManagementTolateService) {

  lateUsersInfo: Array<LateInfo>;

  constructor(private managementLateService: ManagementLateUsersService) {
  }

  ngOnInit() {
    this.managementTolateService.getListLate().subscribe(value => {
        this.listLate = value.data;
      },
    );
  }

  uploadImportFile(fileList) {
    this.managementLateService.importFileLateComingUser(fileList[0]).subscribe((response: LateInfoAllUsersDTO) => {
      this.lateUsersInfo = response.data;
      console.log(response.data);
    })
    console.log(fileList[0]);
  }
}
