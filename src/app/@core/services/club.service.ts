import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';

@Injectable({
  providedIn: 'root',
})
export class ClubService {

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  private clubUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/clubs';
  private createdClubUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/groups/clubs';
  private httpOptions = this.httpService.setHeaderToken();

  addClub(club): Observable<any> {

    return this.http.post(this.clubUrl, club, this.httpOptions);
  }

  updateClub(id, club): Observable<any> {
    return this.http.put(`${this.createdClubUrl}/${id}`, club, this.httpOptions);
  }
}
