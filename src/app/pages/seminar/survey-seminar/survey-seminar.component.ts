import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreatingSurveySeminarComponent} from './creating-survey-seminar/creating-survey-seminar.component';
import {SeminarService} from '../../../@core/services/seminar.service';
import {Event} from '../../../@core/models/event.model';
import {ResponseListEventDTO} from '../../../@core/models/responseListEventDTO.model';
import {User} from '../../../@core/models/user.model';

@Component({
  selector: 'survey-seminar',
  templateUrl: './survey-seminar.component.html',
  styleUrls: ['./survey-seminar.component.scss'],
})
export class SurveySeminarComponent implements OnInit {
  listSeminarEvent: Array<Event> = new Array<Event>();

  constructor(private modalService: NgbModal, private seminarService: SeminarService) {
  }

  ngOnInit() {
    this.seminarService.getAllSeminarEvent().subscribe((response: ResponseListEventDTO) => {
      if (response.status_code === 200) {
        this.listSeminarEvent = response.data;
      }
    });
  }

  open(content) {
    this.modalService.open(content, {backdrop: 'static', centered: true, size: 'lg'});
  }
}
