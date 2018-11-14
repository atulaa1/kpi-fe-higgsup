import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../@core/models/user.model';
import {ManagementUsersService} from '../../@core/services/management-users.service';
import {Activity} from '../../@core/models/activity.model';
import {Group} from '../../@core/models/group.model';
import {CreatedActivity} from '../../@core/models/createdActivity.model';

interface Title {
  id: String;
  description: String;
}

@Component({
  selector: 'ngx-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy, OnInit {
  private title: Title[];
  private recentActivity: String[];
  currentYear: number = null;
  group;
  groupList;
  groupListClone;
  message: string;
  nameSearch: string;
  monthStatus: string = '0';
  yearStatus: string = '0';
  listMonth = [];
  listYear = [];

  private alive = true;
  showMsg: boolean = false;

  constructor(private mService: ManagementUsersService) {
  }

  ngOnInit() {
    this.title = [
      {id: 'recent', description: 'Hoạt động gần đây'},
      {id: 'notify', description: 'Thông báo'},
      {id: 'rank', description: 'Danh sách thứ hạng'},
    ];

    this.recentActivity = [
      'Seminar Angular',
      'Seminar Spring',
      'Seminar NodeJS',
      'Seminar Karma',
      'Seminar Thread In Java',
    ];

    this.currentYear = new Date().getFullYear();

    for (let i = 2018; i <= (new Date()).getFullYear(); i++) {
      const currentYear = new Date().getFullYear();
      this.listYear.push(i);
      if (currentYear === i) {
        this.yearStatus = i.toString();
      }
    }

    for (let i = 1; i <= 12; i++) {
      const currentMonth = new Date().getMonth() + 1;
      this.listMonth.push(i);
      if (currentMonth === i) {
        this.monthStatus = i.toString();
      }
    }
  }

  handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.searchEmployee();
    } else if (this.nameSearch === '') {
      this.searchEmployee();
    }
  }

  searchName(employee) {
    return employee.name.toUpperCase().indexOf(this.nameSearch.toUpperCase()) >= 0;
  }

  searchEmployee() {
    this.showMsg = false;
    this.groupList = Object.assign(this.groupListClone);
    this.groupList = this.groupList.filter(employee => this.searchName(employee));
    if (this.groupList.length === 0) {
      this.showMsg = true;
    }
  }

  onFilterEmployee() {
    this.filterMonth();
    this.filterYear();
  }

  // Filter with month
  filterMonth() {

  }

  // filter with year
  filterYear() {

  }

  watchMore() {

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
