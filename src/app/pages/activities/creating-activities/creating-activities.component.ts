import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from '../../../@core/services/activities.service';
import {Group} from '../../../@core/models/group.model';
import {CreatedActivity} from '../../../@core/models/createdActivity.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-creating-activities',
  templateUrl: './creating-activities.component.html',
  styleUrls: ['./creating-activities.component.scss'],
})
export class CreatingActivitiesComponent implements OnInit {
  groupList: Array<Group<CreatedActivity>>;
  groupListClone: Array<Group<CreatedActivity>>;
  showMsg: boolean = false;
  nameSearch: string;
  currentUserName: string = '';

  constructor(private activitiesService: ActivitiesService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.currentUserName = JSON.parse(localStorage.getItem('currentUser')).username;
    this.activitiesService.getCreatedActivity().subscribe(response => {
      if (response.status_code === 200) {
        this.groupList = response.data.filter(activity =>
          activity.groupType.id !== 2).concat(response.data.filter(activity => activity.additionalConfig.host === this.currentUserName));
        this.groupListClone = Object.assign(this.groupList);
        this.sortActivityArrayByType();
      }
    });
  }

  handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.searchActivities();
    } else if (this.nameSearch === '') {
      this.searchActivities();
    }
  }

  searchNameActivities(activitie) {
    return activitie.name.toUpperCase().indexOf(this.nameSearch.toUpperCase()) >= 0
  }

  searchActivities() {
    this.showMsg = false;
    this.groupList = Object.assign(this.groupListClone);
    this.groupList = this.groupList.filter(value => this.searchNameActivities(value));
    if (this.groupList.length === 0) {
      this.showMsg = true;
    }
  }

  open(content) {
    this.modalService.open(content, {backdrop: 'static', centered: true, size: 'lg'});
  }

  sortActivityArrayByType() {
    this.groupList.sort((a, b) => {
      const nameA = a.groupType.name.toUpperCase(); // bỏ qua in hoa thường
      const nameB = b.groupType.name.toUpperCase(); // bỏ qua in hoa thường
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }
}
