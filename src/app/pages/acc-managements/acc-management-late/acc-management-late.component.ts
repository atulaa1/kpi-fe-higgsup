import {Component, OnInit} from '@angular/core';
import {ManagementTolateService} from '../../../@core/services/management-tolate.service';
import {LateInfo} from '../../../@core/models/lateInfo.model';

@Component({
  selector: 'acc-management-late',
  templateUrl: './acc-management-late.component.html',
  styleUrls: ['./acc-management-late.component.scss'],
})
export class AccManagementLateComponent implements OnInit {
  listLateClone: Array<LateInfo>;
  listLate: Array<LateInfo>;
  showMsg: boolean = false;
  word: string = '';

  constructor(private managementTolateService: ManagementTolateService) {
  }

  ngOnInit() {
    this.managementTolateService.getListLate().subscribe(value => {
        this.listLate = value.data;
        this.listLateClone =  Object.assign(this.listLate);
      },
    );
  }

  mysearch(lateInfo) {
    return lateInfo.user.fullName.toUpperCase().indexOf(this.word.toUpperCase()) >= 0;
  }

  search() {
    this.showMsg = false;
    this.listLate = Object.assign(this.listLateClone);
    this.listLate = this.listLate.filter(late => this.mysearch(late));
    if (this.listLate.length === 0) {
      this.showMsg = true;
    }
  }

  handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.search();
    } else if (this.word === '') {
      this.search();
    }
  }
}
