import {Component, OnInit} from '@angular/core';
import {ManagementTolateService} from '../../../@core/services/management-tolate.service';
import {Late} from '../../../@core/models/late.model';
import {User} from '../../../@core/models/user.model';

@Component({
  selector: 'acc-management-late',
  templateUrl: './acc-management-late.component.html',
  styleUrls: ['./acc-management-late.component.scss'],
})
export class AccManagementLateComponent implements OnInit {
  listLate: Array<Late<User>>;
  constructor(private managementTolateService: ManagementTolateService) {
  }
  ngOnInit() {
    this.managementTolateService.getListLate().subscribe(response => {
      this.listLate = response.data;
      console.log(this.listLate)
    })
  }
}
