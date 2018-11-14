import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable({providedIn: 'root'})
export class MemberGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (JSON.parse(localStorage.getItem('currentUser')).userRole.length === 1) {
      // logged in so return true
      return true;
    }else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['dashboard']);
      return false;
    }

  }
}