import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';
import {ResponseListEventDTO} from '../models/responseListEventDTO.model';

@Injectable({
  providedIn: 'root',
})
export class SeminarService {

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  private seminarUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/groups/seminar';

  private seminarEventUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/events/seminar';

  private httpOptions = this.httpService.setHeaderToken();

  addSeminar(seminar): Observable<any> {

    return this.http.post(this.seminarUrl, seminar, this.httpOptions);
  }

  updateSeminar(id, seminar): Observable<any> {
    return this.http.put(`${this.seminarUrl}/${id}`, seminar, this.httpOptions);
  }

  addSeminarEvent(seminar): Observable<any> {

    return this.http.post(this.seminarEventUrl, seminar, this.httpOptions);
  }

  updateSeminarEvent(seminar, id): Observable<any> {

    return this.http.put(`${this.seminarEventUrl}/${id}`, seminar, this.httpOptions);
  }

  getAllSeminarEvent(): Observable<ResponseListEventDTO> {
    return this.http.get<ResponseListEventDTO>(this.seminarEventUrl, this.httpOptions);
  }
}
