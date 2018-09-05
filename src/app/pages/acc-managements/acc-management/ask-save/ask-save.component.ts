import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ManagementUsersService} from '../../../../@core/services/management-users.service';
import {User} from '../../../../@core/models/user.model';
import swal from 'sweetalert';

@Component({
  selector: 'ngx-save-acc-modal',
  templateUrl: './ask-save.component.html',
  styleUrls: ['./ask-save.component.scss'],
})
export class AskSaveComponent implements OnInit {
  @Input() editedUser = new User();
  @Input() dismiss;
  @Input() beforeEditedUser = new User();
  @Output() updateEvent = new EventEmitter<User>();
  @Output() cancelEvent = new EventEmitter<User>();
  constructor(private manageUserService: ManagementUsersService) {
  }

  ngOnInit() {
  }

  cancelSave() {
    this.beforeEditedUser.isEdited = false;
    this.cancelEvent.emit(this.beforeEditedUser);
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
        swal('Chúc Mừng!', 'Đã sửa thành công!', 'success');
        this.editedUser.isEdited = false;
        this.updateEvent.emit(this.editedUser);
      } else if (res.statusCode === 900) {
        swal('Thông báo!', 'User này không tồn tại!', 'error');
      }
      this.dismiss();
    });

  }
}
