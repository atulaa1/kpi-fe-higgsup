import {Injectable, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {CookieService} from 'ngx-cookie-service';
import {BaseConstant} from '../glossary/base.constant';
import {User} from '../models/user.model';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ManagementUsersService implements OnInit {
  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private httpService: HttpService) {
  }

  getUsersUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/kpi/api/users';

  updateRoleUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/kpi/api/users';

  ngOnInit() {
  }

  getUser(): Observable<any> {
    const httpOptions = this.httpService.setHeaderAuthor(this.cookieService.get('Authorization'));
    return this.http.get(this.getUsersUrl, httpOptions);
  }

  editUser(username, roles) {
    const httpOptions = this.httpService.setHeaderAuthor(this.cookieService.get('Authorization'));
    return this.http.put<any>(`${this.updateRoleUrl}/${username}` + '/roles', roles , httpOptions);
  }

}
