import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {LoginComponent} from '../../../modals/login/login.component';
import {User} from '../../../@core/models/user.model';
import {CookieService} from 'ngx-cookie-service';
import {AuthenService} from '../../../@core/services/authen.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  loginModal: BsModalRef;

  @Input() position = 'normal';

  user: User;

  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  items = [
    {
      title: 'Profile',
      link: [],
    },
    {
      title: 'Change Password',
      link: [],
    },
    {
      title: 'Privacy Policy',
      link: [],
    },
    {
      title: 'Logout',
      link: [],
    },
  ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private bsModal: BsModalService,
              private cookieService: CookieService,
              private router: Router,
              private authenService: AuthenService) {
  }

  ngOnInit() {
    this.user = new User();
    this.user.token = this.cookieService.get('Authorization');
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

  logout() {
    this.authenService.logOut();
    this.router.navigateByUrl('/');
    window.location.reload();
  }

  startSearch() {
  }
}
