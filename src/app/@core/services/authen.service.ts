import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {BaseConstant} from '../glossary/base.constant';
import {map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthenService {

  constructor(private http: HttpClient, private httpService: HttpService, private cookieService: CookieService) {
  }

  attemptAuth(user: User): Observable<any> {

    const userJson = JSON.stringify({'username': user.username, 'password': user.password});
    return this.http.post(
       BaseConstant.protocol.toString() + BaseConstant.server.toString()
        + BaseConstant.standardServicePort.toString() + '/kpi/api/login', userJson, {
        headers: new HttpHeaders({}),
        observe: 'response',
      }).pipe(map((data) => {
      // set remember. if remember so will remember 100 day
      const expiredDate = new Date();
      if (user.remember) {
        this.cookieService.set('Authorization', data.headers.get('Authorization'), expiredDate.getDay() + 100)
      } else {
        this.cookieService.set('Authorization', data.headers.get('Authorization'))
      }

    }));

  }
  logOut() {
    this.cookieService.delete('Authorization');
  }
}
