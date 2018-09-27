import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    let idAdmin = false;
    if (user !== null ) {
      const roles = user.userRole;
      idAdmin = roles.indexOf('ROLE_ADMIN') >= 0;
    }
    if (!idAdmin)
      this.router.navigate(['/pages/unauthorized']);
    return idAdmin;
  }


}
