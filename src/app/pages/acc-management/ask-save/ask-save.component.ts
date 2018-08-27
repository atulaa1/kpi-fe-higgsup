import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ManagementUsersService} from '../../../@core/services/management-users.service';
import {User} from '../../../@core/models/user.model';

@Component({
  selector: 'ngx-save-acc-modal',
  templateUrl: './ask-save.component.html',
  styleUrls: ['./ask-save.component.scss'],
})
export class AskSaveComponent implements OnInit {
  @Input() editedUser = new User();
  @Input() dismiss;
  @Output() messageEvent = new EventEmitter<User>();
  constructor(private manageUserService: ManagementUsersService) {
  }

  ngOnInit() {
  }

  cancelAskSave() {
    this.dismiss();
  }

  saveRole() {
    if (this.editedUser.mainRole === 'ROLE_MAN') {
      this.editedUser.userRole = ['ROLE_MAN',
        'ROLE_EMPLOYEE']
    } else {
      this.editedUser.userRole = ['ROLE_EMPLOYEE']
    }
    this.manageUserService.editUser(this.editedUser.username, this.editedUser.userRole).subscribe(res => {
      if (res.status_code === 200) {
        this.editedUser.isEdited = false;
        this.messageEvent.emit(this.editedUser);
      } else if (res.statusCode === 900) {
      }
      this.dismiss();
    });

  }
}
