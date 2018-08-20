import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  private SurveyUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/survey/questions-man';

  private httpOptions = this.httpService.setHeaderToken();

  getListSurvey(): Observable<any> {

    return this.http.get(this.SurveyUrl, this.httpOptions);
  }
}
