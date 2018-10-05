import {Injectable} from '@angular/core';
import {BaseConstant} from '../glossary/base.constant';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {EventTeambuilding} from '../models/event-teambuilding.model';
import {Observable} from 'rxjs';
import {ResponseEventTeambuildingDTO} from '../models/response-event-teambuilding-dto.model';

@Injectable({
  providedIn: 'root'
})
export class EventTeambuildingService {

  private eventTeambuildingUrl = BaseConstant.protocol.toString() + BaseConstant.server.toString()
    + BaseConstant.standardServicePort.toString() + '/api/events/team-building';

  private httpOptions = this.httpService.setHeaderToken();

  constructor(private httpClient: HttpClient,
              private httpService: HttpService) {
  }

  addEventTeambuilding(eventTeambuildingDTO: EventTeambuilding<null>): Observable<ResponseEventTeambuildingDTO> {
    const jsonEventDTO = JSON.stringify(eventTeambuildingDTO);
    return this.httpClient.post<ResponseEventTeambuildingDTO>(this.eventTeambuildingUrl, jsonEventDTO, this.httpOptions);
  }

  getAllEventTeambuilding(): Observable<ResponseEventTeambuildingDTO> {
    return this.httpClient.get<ResponseEventTeambuildingDTO>(this.eventTeambuildingUrl, this.httpOptions)
  }
}
