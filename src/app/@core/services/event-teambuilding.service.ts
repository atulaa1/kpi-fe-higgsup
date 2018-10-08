import {Injectable} from '@angular/core';
import {BaseConstant} from '../glossary/base.constant';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {ResponseEventTeambuildingDTO} from '../models/response-event-teambuilding-dto.model';
import {Event} from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventTeambuildingService {

  private eventTeambuildingUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/events/team-building';

  private httpOptions = this.httpService.setHeaderToken();

  constructor(private httpClient: HttpClient,
              private httpService: HttpService) {
  }

  addEventTeambuilding(eventTeambuilding: Event): Observable<ResponseEventTeambuildingDTO<Event>> {
    const jsonEventDTO = JSON.stringify(eventTeambuilding);
    return this.httpClient.post<ResponseEventTeambuildingDTO<Event>>(this.eventTeambuildingUrl, jsonEventDTO, this.httpOptions);
  }

  getAllEventTeambuilding(): Observable<ResponseEventTeambuildingDTO<Array<Event>>> {
    return this.httpClient.get<ResponseEventTeambuildingDTO<Array<Event>>>(this.eventTeambuildingUrl, this.httpOptions)
  }
}
