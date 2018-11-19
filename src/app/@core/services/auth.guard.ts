import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../../modals/login/login.component';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  loginModal: NgbModalRef;

  constructor(private router: Router, private bsModal: NgbModal,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['dashboard']);
    this.loginModal = this.bsModal.open(LoginComponent, {backdrop: 'static', centered: true});
    return false;
  }
}
