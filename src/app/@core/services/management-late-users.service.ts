import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';
import {Observable} from 'rxjs';
import {LateInfo} from '../models/lateInfo.model';
import {ResponDTOLateInfo} from '../models/ResponDTOLateInfo';

@Injectable({
  providedIn: 'root'
})
export class ManagementLateUsersService {

  constructor(private http: HttpClient,
              private httpService: HttpService) {
  }

  private url = BaseConstant.protocol.toString() + BaseConstant.server.toString() +
    BaseConstant.standardServicePort.toString() + '/api/late-times';
  private httpOptions = this.httpService.setHeaderToken();

  getListLate(): Observable<ResponDTOLateInfo<Array<LateInfo>>> {
    return this.http.get<ResponDTOLateInfo<Array<LateInfo>>>(this.url, this.httpOptions);
  }

  importFileLateComingUser(file: File): Observable<ResponDTOLateInfo<Array<LateInfo>>> {
    let formData = new FormData();
    formData.append('file', file, file.name);
    this.httpOptions.headers = this.httpOptions.headers.delete('Content-Type');
    return this.http.post<ResponDTOLateInfo<Array<LateInfo>>>(this.url + '/import-file', formData, this.httpOptions);
  }

  updateLateInfo(lateInfo: LateInfo, newLateComingTime): Observable<ResponDTOLateInfo<LateInfo>> {
    let lateInfoJson = JSON.stringify({lateTimes: newLateComingTime});
    return this.http.put<ResponDTOLateInfo<LateInfo>>(this.url + '/' + lateInfo.id, lateInfoJson.toString(), this.httpOptions);
  }
}
