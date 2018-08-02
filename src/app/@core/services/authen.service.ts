import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {BaseConfig} from '../glossary/BaseConfig';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthenService {

  constructor(private http: HttpClient, private httpService: HttpService, private cookieService: CookieService) {
  }

  attemptAuth(user: User): Observable<any> {
    const userJson = JSON.stringify({'username': user.username, 'password': user.password});
    return this.http.post(
      BaseConfig.protocol.toString() + BaseConfig.server.toString()
      + BaseConfig.standardServicePort.toString() + '/api/login', userJson, {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response',
      });

  }

  login(user: User) {
    this.attemptAuth(user).subscribe(
      (res) => {
        this.cookieService.set('Authorization', res.headers.get('Authorization'));
        return true;
      },
      (error) => {
        return false;
      },
    )
  }
}
