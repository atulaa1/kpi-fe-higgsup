import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';
import {ResponseEventDTO} from '../models/responseEventDTO.model';

@Injectable({
  providedIn: 'root',
})
export class ClubService {

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  private clubUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/groups/club';
  private createdClubUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/groups/club';
  private clubEventUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/events/club';

  private httpOptions = this.httpService.setHeaderToken();

  addClub(club): Observable<any> {

    return this.http.post(this.clubUrl, club, this.httpOptions);
  }

  updateClub(id, club): Observable<any> {
    return this.http.put(`${this.createdClubUrl}/${id}`, club, this.httpOptions);
  }
  addEventClub(clubEvent): Observable<any> {
    return this.http.post(this.clubEventUrl, clubEvent, this.httpOptions);
  }
  updateEventClub(clubEvent, id): Observable<any> {
    return this.http.put(`${this.clubEventUrl}/${id}`, clubEvent, this.httpOptions);
  }
}
