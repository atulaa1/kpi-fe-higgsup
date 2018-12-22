import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';
import {ResponsePointDTO} from '../models/response-point-DTO';
import {NormalPointModel} from '../models/normal-point.model';

@Injectable({
  providedIn: 'root',
})
export class GetPointService {
  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  private normalPointUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/point/point-detail';
  private httpOptions = this.httpService.setHeaderToken();

  getNormalPoint(): Observable<ResponsePointDTO<Array<NormalPointModel>>> {
    return this.http.get<ResponsePointDTO<Array<NormalPointModel>>>(this.normalPointUrl, this.httpOptions);
  }
}
