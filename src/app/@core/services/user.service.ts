import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/Rx';
import {User} from '../models/user.model';
import {ResponseDTO} from '../models/responseDTO.model';
import {Observable} from 'rxjs';
import {BaseConstant} from '../glossary/base.constant';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSource = new BehaviorSubject(new User());
  currentUser = this.userSource.asObservable();
  private user = new User();
  private httpOptions = this.httpService.setHeaderToken();

  constructor(private http: HttpClient, private cookieService: CookieService, private httpService: HttpService) { }
  getUserUrl = 'http://192.168.1.137:8080/kpi/api/users/';
  getUserInfoHttp(username: string) {
    this.http.get(this.getUserUrl + username, this.httpOptions).subscribe(
      (response: ResponseDTO) => {
        this.user = response.data;
        this.userSource.next(this.user);
      },
    );
  }


  updatePersonalInfo(user: User): Observable<User> {
    const updatedUser = JSON.stringify(user);
    return this.http.put<User>(BaseConstant.protocol.toString() + BaseConstant.server.toString()
      + BaseConstant.standardServicePort.toString() + '/api/users/' + user.username, updatedUser, this.httpOptions);
  }
}
