import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseConstant} from '../glossary/base.constant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoService {

  constructor(private http: HttpClient) {
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
      updatedUser, httpOptions);
  }
}
