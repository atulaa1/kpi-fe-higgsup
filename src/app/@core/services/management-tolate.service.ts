import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';

@Injectable({
  providedIn: 'root',
})
export class ManagementTolateService {
  private lateUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/late-times';
  private httpOptions = this.httpService.setHeaderToken();
  constructor(private http: HttpClient, private httpService: HttpService) {
  }
  getListLate(): Observable<any> {
    return this.http.get<any>(this.lateUrl, this.httpOptions)
  }
}
