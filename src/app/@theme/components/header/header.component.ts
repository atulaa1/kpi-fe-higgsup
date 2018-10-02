import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {LoginComponent} from '../../../modals/login/login.component';
import {User} from '../../../@core/models/user.model';
import {CookieService} from 'ngx-cookie-service';
import {AuthenService} from '../../../@core/services/authen.service';
import {Router} from '@angular/router';
import {LogoutComponent} from '../../../modals/logout/logout.component';
import {UserService} from '../../../@core/services/user.service';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {PersonalInfoComponent} from '../../../modals/personal-info/personal-info.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  loginModal: NgbModalRef;
  logoutModal: NgbModalRef;
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
              private bsModal: NgbModal,
              private cookieService: CookieService,
              private router: Router,
              private authenService: AuthenService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.user = new User();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.user = currentUser;
      // when has currentUser then set data from currentUser
      this.userService.userSource.next(this.user);
    }
    // always subscribe when currentUser change
    this.userService.currentUser.subscribe(user => this.user = user);
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
    this.loginModal = this.bsModal.open(LoginComponent, {backdrop: 'static', centered: true});
  }

  openLogoutModal() {
    this.logoutModal = this.bsModal.open(LogoutComponent, {backdrop: 'static', centered: true});
  }

  logout() {
    this.authenService.logOut();
    this.router.navigateByUrl('/');
    window.location.reload();
  }

  openPersonalInfo() {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      centered: true,
      keyboard: false,
    };
    const modalRef = this.bsModal.open(PersonalInfoComponent, ngbModalOptions);
    modalRef.result.then((data) => {
    }, (reason) => {
    })
  }

  startSearch() {
  }
}
