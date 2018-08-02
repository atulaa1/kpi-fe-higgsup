import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {BaseConstant} from '../glossary/base.constant';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthenService {

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  attemptAuth(user: User): Observable<any> {

    const userJson = JSON.stringify({'username': user.username, 'password': user.password});
    return this.http.post(
      BaseConstant.protocol.toString() + BaseConstant.server.toString()
      + BaseConstant.standardServicePort.toString() + '/api/login', userJson, {
        headers: new HttpHeaders({}),
        observe: 'response',
      }).pipe(map((data) => {
      user.password = null;
      user.token = data.headers.get('Authorization');
      window.localStorage['user'] = JSON.stringify(user);
    }));

  }
}
