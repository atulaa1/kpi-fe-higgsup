import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TeambuildingActivityComponent} from './teambuilding-activity/teambuilding-activity.component';
import {EventTeambuildingService} from '../../@core/services/event-teambuilding.service';
import {ResponseEventTeambuildingDTO} from '../../@core/models/response-event-teambuilding-dto.model';
import {Event} from '../../@core/models/event.model';

@Component({
  selector: 'event-teambuilding',
  templateUrl: './event-teambuilding.component.html',
  styleUrls: ['./event-teambuilding.component.scss']
})
export class EventTeambuildingComponent implements OnInit {

  listEventTeambuilding: Array<Event> = new Array<Event>();

  constructor(private modalService: NgbModal,
              private eventTeambuildingService: EventTeambuildingService) {
  }

  ngOnInit() {
    this.eventTeambuildingService.getAllEventTeambuilding().subscribe((response: ResponseEventTeambuildingDTO) => {
      this.listEventTeambuilding = response.data;
    })
  }

  getAllEventTeambuilding() {

  }

  openModalAddNewTBD() {
    this.modalService.open(TeambuildingActivityComponent, {backdrop: 'static', centered: true, size: 'lg'})
  }

}
