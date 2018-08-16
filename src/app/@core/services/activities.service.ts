import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {

  constructor(private http: HttpClient, private cookieService: CookieService, private httpService: HttpService) {
  }

  private activitiesUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/group-types';

  private httpOptions = this.httpService.setHeaderToken();

  getListActivities(): Observable<any> {

    return this.http.get(this.activitiesUrl, this.httpOptions);
  }
}
