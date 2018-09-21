import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-created-activities',
  templateUrl: './created-activities.component.html',
  styleUrls: ['./created-activities.component.scss'],
})
export class CreatedActivitiesComponent implements OnInit {
  showMsg: boolean = false;
  nameSearch: string;
  constructor() { }

  ngOnInit() {
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
}
