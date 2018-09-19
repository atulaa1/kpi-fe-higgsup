import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';
import {ResponseDTONew} from '../models/ResponseDTONew';
import {Late} from '../models/late.model';

@Injectable({
  providedIn: 'root',
})
export class ManagementTolateService {
  private lateUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/late-times';
  private httpOptions = this.httpService.setHeaderToken();
  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  getListLate(): Observable<ResponseDTONew<Array<Late>>> {
    return this.http.get<ResponseDTONew<Array<Late>>>(this.lateUrl, this.httpOptions);
  }
}
