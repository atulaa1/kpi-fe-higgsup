import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ManagementUsersService} from '../../../@core/services/management-users.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../@core/models/user.model';

@Component({
  selector: 'ngx-ask-save',
  templateUrl: './ask-save.component.html',
  styleUrls: ['./ask-save.component.scss'],
})
export class AskSaveComponent implements OnInit {
  private user = new User();

  constructor(private bsModal: BsModalService,
              private mService: ManagementUsersService,
              private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  cancelAskSave() {
    this.activeModal.close();
  }

  saveRole() {
    alert('da luu');
    // this.mService.editUser(username, this.user.userRole[0] ).subscribe(res => {
    //   this.role = res.data.userRole;
    // })
    this.activeModal.close();
  }
}
