import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {LoginComponent} from '../../../modals/login/login.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  loginModal: BsModalRef;

  @Input() position = 'normal';

  user: any;

  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private bsModal: BsModalService) {
  }

  ngOnInit() {
    this.user = {name: 'sdafaf'};
  }


  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  openLoginModal() {
    this.loginModal = this.bsModal.show(LoginComponent);
  }

  startSearch() {
  }
}
