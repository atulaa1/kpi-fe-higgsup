import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {BaseConstant} from '../glossary/base.constant';

@Injectable({
  providedIn: 'root',
})
export class TeambuildingService {

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  private teambuildingUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/groups/team-building';

  private httpOptions = this.httpService.setHeaderToken();

  addTeambuilding(teambuilding): Observable<any> {

    return this.http.post(this.teambuildingUrl, teambuilding, this.httpOptions);
  }
  updateTeambuilding(teambuilding): Observable<any> {
    return this.http.put(this.teambuildingUrl, teambuilding, this.httpOptions);
  }
}
