import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';
import {Survey} from '../models/survey.model';
import {ResponseEvaluateDTO} from '../models/responseEvaluateDTO.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {

  private surveyUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/survey/questions-man';

  private personalSurveyUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/evaluation';
  private httpOptions = this.httpService.setHeaderToken();

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  getListSurvey(): Observable<any> {

    return this.http.get(this.surveyUrl, this.httpOptions);
  }

  updateSurvey(surveys: Array<Survey>): Observable<any> {
    return this.http.put(this.surveyUrl, surveys , this.httpOptions);
  }

  getAllInfoPersonalSurvey(): Observable<ResponseEvaluateDTO> {
    return this.http.get<ResponseEvaluateDTO>(this.personalSurveyUrl + '/info', this.httpOptions);
  }
}
