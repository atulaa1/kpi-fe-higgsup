import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import {ResponseEventDTO} from '../models/responseEventDTO.model';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesConfirmService {


  constructor(private http: HttpClient, private cookieService: CookieService, private httpService: HttpService) {
  }

  private activitieConfirmUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/events';

  private confirmEventUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/events/club-support';
  private httpOptions = this.httpService.setHeaderToken();

  getListActivitiesConfirm(): Observable<any> {
    return this.http.get(this.confirmEventUrl, this.httpOptions)
  }

  confirmEvent(eventConfirmation, id): Observable<ResponseEventDTO> {
    return this.http.put<ResponseEventDTO>(`${this.activitieConfirmUrl}/${id}/status`, eventConfirmation, this.httpOptions)
  }

}
