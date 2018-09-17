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
  showMsg: boolean = false;
  nameSearch: string;

  constructor(private activitiesService: ActivitiesService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.activitiesService.getCreatedActivity().subscribe(response => {
      if (response.status_code === 200) {
        this.groupList = response.data;
      }
    });
  }

  handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.mySearchFunction();
    } else if (this.nameSearch === '') {
      this.mySearchFunction();
    }
  }

  mySearchFunction() {
    this.showMsg = true;
    let input, filter, table, tr, td, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
          this.showMsg = false;
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }

  open(content) {
    this.modalService.open(content, {backdrop: 'static', centered: true, size: 'lg'});
  }
}
