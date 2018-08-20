import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AskSaveComponent} from './ask-save/ask-save.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ManagementUsersService} from '../../@core/services/management-users.service';

@Component({
  selector: 'acc-management',
  templateUrl: './acc-management.component.html',
  styleUrls: ['./acc-management.component.scss'],
})
export class AccManagementComponent implements OnInit {
  list = [];

  constructor(
    private bsModal: NgbModal,
    private mService: ManagementUsersService
  ) { }
  select = 'Man';
  show = true;
  logoutModal: NgbModalRef;
  ngOnInit() {
    this.mService.getUser().subscribe(data => {
      this.list = data;
    })
  }
  myFunction() {
      // Declare variables
      let input, filter, table, tr, td, i;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");

      // Loop through all table rows, and hide those who don't match the search query
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
  }
  edit() {
    this.show = !this.show;
  }
  save(){
    this.show = !this.show;
  }
  openAskSaveModal() {
    // this.bsModal.show(AskSaveComponent);
    this.bsModal.open(AskSaveComponent);
  }
}
