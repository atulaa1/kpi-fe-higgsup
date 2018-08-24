import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';

@Injectable({
  providedIn: 'root',
})
export class SeminarService {

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  private seminarUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/groups/seminars';

  private httpOptions = this.httpService.setHeaderToken();

  addSeminar(seminar): Observable<any> {

    return this.http.post(this.seminarUrl, seminar, this.httpOptions);
  }

  updateSeminar(id, seminar): Observable<any> {
    return this.http.put(`${this.seminarUrl}/${id}`, seminar, this.httpOptions);
  }
}
