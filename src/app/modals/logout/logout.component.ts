import {Component, Input, OnInit} from '@angular/core';
import {AuthenService} from '../../@core/services/authen.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  logoutModal: BsModalRef;

  constructor(private router: Router,
              private authenService: AuthenService,
              private bsModal: BsModalService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authenService.logOut();
    this.router.navigateByUrl('/');
    window.location.reload();
  }

  cancelLogout() {
    this.bsModal.hide(1);
  }


}
