import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {BaseConfig} from '../glossary/BaseConfig';

@Injectable()
export class AuthenService {

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  attemptAuth(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      observe: 'response',
    };
    const userJson = JSON.stringify({'username': user.username, 'password': user.password});
    return this.http.post(
      BaseConfig.protocol.toString() + BaseConfig.server.toString()
      + BaseConfig.standardServicePort.toString() + '/api/login', userJson, httpOptions);

  }

  login(user: User) {
    this.attemptAuth(user).subscribe(
      (res) => {
        window.localStorage['Authorization'] = res.headers.get('Authorization');
        return true;
      },
      (error) => {
        return false;
      },
    )
  }
}
