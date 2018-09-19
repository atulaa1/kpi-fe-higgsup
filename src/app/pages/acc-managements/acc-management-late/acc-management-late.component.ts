import {Component, OnInit} from '@angular/core';
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
  }

  ngOnInit() {
    this.managementTolateService.getListLate().subscribe(value => {
        this.listLate = value.data;
      },
    );
  }
}
