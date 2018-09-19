import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';
import {ResponDTOLateInfo} from '../models/ResponDTOLateInfo';
import {LateInfo} from '../models/lateInfo.model';

@Injectable({
  providedIn: 'root',
})
export class ManagementTolateService {
  private lateUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/late-times';
  private httpOptions = this.httpService.setHeaderToken();
  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  getListLate(): Observable<ResponDTOLateInfo<Array<LateInfo>>> {
    return this.http.get<ResponDTOLateInfo<Array<LateInfo>>>(this.lateUrl, this.httpOptions);
  }
}
