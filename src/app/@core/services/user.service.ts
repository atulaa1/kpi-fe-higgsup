import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/Rx';
import {User} from '../models/user.model';
import {ResponseDTO} from '../models/responseDTO.model';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSource = new BehaviorSubject(new User());
  currentUser = this.userSource.asObservable();
  private user = new User();

  constructor(private http: HttpClient, private httpService: HttpService) { }
  getUserUrl = 'http://192.168.1.137:8080/kpi/api/users/';
  getUserInfoHttp(username: string) {
    const httpOptions = this.httpService.setHeaderToken();
    this. http.get(this.getUserUrl + username, httpOptions).subscribe(
      (response: ResponseDTO) => {
        this.user = response.data;
        this.userSource.next(this.user);
      },
    );
  }
}
