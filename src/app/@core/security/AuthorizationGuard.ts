import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {User} from '../models/user.model';

@Injectable({providedIn: 'root'})
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user: User = JSON.parse(localStorage.getItem('currentUser'));
     user.userRole.splice(user.userRole.indexOf('ROLE_EMPLOYEE'), 1);

    const roles = route.data['roles'] as Array<string>;

    if (roles.indexOf('EMPLOYEE') !== -1 && user.userRole.length === 0) {
      return true;
    }
    for (let i = 0; i < roles.length; i++) {
      if ((user.userRole.indexOf('ROLE_' + roles[i])) !== -1) {
        return true;
      }
    }

    this.router.navigate(['dashboard']);
    return false;
  }
}
