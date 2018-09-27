import {Injectable} from '@angular/core';
import {BaseConstant} from '../glossary/base.constant';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Rx';


@Injectable({
  providedIn: 'root',
})

export class SupportService {
  private supportUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/groups/support';
  private httpOptions = this.httpService.setHeaderToken();

  private supportEventUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/events/support';


  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  createSupport(support): Observable<any> {
    return this.http.post(this.supportUrl, support, this.httpOptions)
  }

  uppdateSuport(support): Observable<any> {
    return this.http.put(this.supportUrl, support, this.httpOptions)
  }

  createEventSupport(support): Observable<any> {
    return this.http.post(this.supportEventUrl, support, this.httpOptions)
  }

  updateEventSupport(support, id): Observable<any> {
    return this.http.put(`${this.supportEventUrl}/${id}`, support, this.httpOptions)
  }
}
