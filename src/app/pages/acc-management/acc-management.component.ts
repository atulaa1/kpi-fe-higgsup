import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AskSaveComponent} from './ask-save/ask-save.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ManagementUsersService} from '../../@core/services/management-users.service';
import {User} from '../../@core/models/user.model';

@Component({
  selector: 'acc-management',
  templateUrl: './acc-management.component.html',
  styleUrls: ['./acc-management.component.scss'],
})
export class AccManagementComponent implements OnInit {
  listUser = [];
  username;
  btnSave;
  btnEdit;
  save;
  userRole = [
    'ROLE_ADMIN',
    'ROLE_EMPLOYEE',
    ];
  constructor(
    private bsModal: NgbModal,
    private mService: ManagementUsersService,
  ) { }
  logoutModal: NgbModalRef;
  ngOnInit() {
    this.mService.getUser().subscribe(res => {
      this.listUser = res.data;
    })
  }
  mySearchFunction() {
      // Declare variables
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
          } else {
            tr[i].style.display = 'none';
          }
        }
      }
  }
  openAskSaveModal() {
    this.bsModal.open(AskSaveComponent);
    this.btnEdit.style.display = 'block';
    document.getElementById(this.btnSave).style.display = 'none';
  }
  editRole(button, userName) {
    document.getElementById(userName).innerHTML =
      '<select>' +
        '<option>Employee</option>' +
        '<option>Man</option>' +
      '</select>';
    this.btnEdit = document.getElementById(button.currentTarget.id);
    this.btnEdit.style.display = 'none';
    this.save = button.currentTarget.id.split('-');
    this.btnSave = this.save[0] + '-save';
    document.getElementById(this.btnSave).style.display = 'block';
    this.username = userName;
  }
  updateRoleUser(username) {
    this.mService.editUser(username, this.userRole ).subscribe(res =>{
        alert(username);
    })
  }
}
