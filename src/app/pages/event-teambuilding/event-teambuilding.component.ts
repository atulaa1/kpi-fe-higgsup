import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventTeambuildingService} from '../../@core/services/event-teambuilding.service';
import {ResponseEventTeambuildingDTO} from '../../@core/models/response-event-teambuilding-dto.model';
import {Group} from '../../@core/models/group.model';
import {Event} from '../../@core/models/event.model';
import {MessageConstant} from '../../@core/glossary/message.constant';

@Component({
  selector: 'event-teambuilding',
  templateUrl: './event-teambuilding.component.html',
  styleUrls: ['./event-teambuilding.component.scss']
})
export class EventTeambuildingComponent implements OnInit {

  listEventTeambuilding: Array<Event> = new Array<Event>();
  listEventTeambuildingData: Array<Event> = new Array<Event>();
  addedEventTeambuilding: Event;
  teambuildingView: Event;
  keyword: string;

  constructor(private modalService: NgbModal,
              private eventTeambuildingService: EventTeambuildingService) {
  }

  ngOnInit() {
    this.eventTeambuildingService.getAllEventTeambuilding().subscribe((response: ResponseEventTeambuildingDTO<Array<Event>>) => {
      this.listEventTeambuilding = response.data;
      this.listEventTeambuildingData = response.data;
    })
  }

  viewEventTeambuilding(content, teambuilding: Event) {
    this.teambuildingView = teambuilding;
    this.modalService.open(content, {backdrop: 'static', centered: true, size: 'lg'})
  }

  openModalAddNewTBD(content) {
    this.teambuildingView = null;
    this.modalService.open(content, {backdrop: 'static', centered: true, size: 'lg'})
  }

  addEventTeambuilding($event) {
    this.addedEventTeambuilding = $event;
    this.addedEventTeambuilding.group = new Group();
    this.addedEventTeambuilding.group.id = 7;
    this.eventTeambuildingService.addEventTeambuilding($event).subscribe((response: ResponseEventTeambuildingDTO<Event>) => {
      if (response.status_code === 200) {
        swal('Chúc mừng', MessageConstant.MSG_SUCCESS.CREATE_SUCCESS, 'success');
        this.listEventTeambuilding.unshift(response.data);
      } else if (response.status_code === 900 && response.message === 'not find user') {
        swal('Thông báo!', MessageConstant.MSG_ERROR.USER_NOTFOUND_ERROR, 'error');
      }
    });
  }

  handleKeyPress($event) {
    if ($event.keyCode === 13) {
      this.searchByKeyword();
    } else if (this.keyword === '') {
      this.searchByKeyword();
    }
  }

  searchByKeyword() {
    this.listEventTeambuilding = this.listEventTeambuildingData.filter(
      teambuilding => teambuilding.name.toLowerCase().includes(this.keyword.toLowerCase()));
  }

}
