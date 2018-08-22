import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseConstant} from '../glossary/base.constant';
import {HttpService} from './http.service';


@Injectable({
  providedIn: 'root',
})
export class PersonalInfoService {

  private httpOptions = this.httpService.setHeaderToken()

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  getPersonalInfo(): Observable<User> {
    return this.http.get <User>(BaseConstant.protocol.toString()
      + BaseConstant.server.toString() +
      BaseConstant.standardServicePort.toString() + '/api/users/kpi.admin');
  }

  updatePersonalInfo(user: User): Observable<User> {
    const updatedUser = JSON.stringify(user);
    return this.http.put<User>(BaseConstant.protocol.toString()
      + BaseConstant.server.toString() +
      BaseConstant.standardServicePort.toString(),
      updatedUser, this.httpOptions);
  }
}
