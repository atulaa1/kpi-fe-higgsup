import {Component, OnInit} from '@angular/core';
import {AskSaveComponent} from './ask-save/ask-save.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ManagementUsersService} from '../../../@core/services/management-users.service';
import {User} from '../../../@core/models/user.model';

@Component({
  selector: 'acc-management',
  templateUrl: './acc-management.component.html',
  styleUrls: ['./acc-management.component.scss'],
})
export class AccManagementComponent implements OnInit {
  username;
  editingUsername: string = null;
  showMsg: boolean = false;
  listUser: Array<User>;
  listUserClone: Array<User>
  editedUser: User;
  beforeEditedUser: User;
  nameSearch: string;

  constructor(private bsModal: NgbModal,
              private managementUsersService: ManagementUsersService) {
  }

  ngOnInit() {
    this.managementUsersService.getUser().subscribe(res => {
      this.listUser = <Array<User>>res.data;
      this.listUserClone = Object.assign(this.listUser);
      // add isEdited for all item
      this.loadUsers();
    });
  }

  loadUsers() {
    this.listUser.forEach(function (user, userIndex) {
      user.isEdited = false;
      user.index = userIndex;
      if (user.userRole.indexOf('ROLE_ADMIN') >= 0) {
        user.mainRole = 'ROLE_ADMIN';
      } else if (user.userRole.indexOf('ROLE_MAN') >= 0) {
        user.mainRole = 'ROLE_MAN';
      } else if (user.userRole.indexOf('ROLE_EMPLOYEE') >= 0 && user.userRole.length === 1) {
        user.mainRole = 'ROLE_EMPLOYEE';
      }
    })
  }

  handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.mySearchFunction();
    } else if (this.nameSearch === '') {
      this.mySearchFunction();
    }
  }

  searchFunction(userInfo) {
    return userInfo.fullName.toUpperCase().indexOf(this.nameSearch.toUpperCase()) >= 0;
  }
  mySearchFunction() {
    this.showMsg = false;
    this.listUser = Object.assign(this.listUserClone)
    this.listUser = this.listUser.filter(value => this.searchFunction(value))
    if (this.listUser.length === 0) {
      this.showMsg = true;
    }
  }
  updateRole(userInfo: User) {
    if (this.editingUsername === null) {
      userInfo.isEdited = true;
      this.editingUsername = userInfo.username;
      this.beforeEditedUser = Object.assign({}, userInfo);  // clone another user
    }
  }

  openSaveModal(content) {
    this.bsModal.open(content, {backdrop: 'static', centered: true});
  }

  updateSuccess($event) {
    this.editedUser = $event;
    this.editingUsername = null;
    this.managementUsersService.getUser().subscribe(res => {
      this.listUser = <Array<User>>res.data;
      // add isEdited for all item
      this.loadUsers();
    })
  }

  cancelAction($event) {
    this.editedUser = $event;
    this.listUser.splice(this.editedUser.index, 1, this.editedUser);
    this.editingUsername = null;
  }

  open(content) {
    this.bsModal.open(content, {backdrop: 'static', centered: true});
  }
}
