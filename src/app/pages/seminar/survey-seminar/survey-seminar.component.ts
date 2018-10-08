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
  listSeminarEventWaiting: Array<Event> = new Array<Event>();
  listSeminarEventDone: Array<Event> = new Array<Event>();
  currentUsername: string = '';

  constructor(private modalService: NgbModal, private seminarService: SeminarService) {
  }

  ngOnInit() {
    this.currentUsername = JSON.parse(localStorage.getItem('currentUser')).username;
    this.getSeminarEvaluationList();
  }

  getSeminarEvaluationList() {
    this.seminarService.getAllSeminarEvent().subscribe((response: ResponseListEventDTO) => {
      if (response.status_code === 200) {
        this.listSeminarEvent = response.data;

        // Lọc các phần tử có hoặc không có username là currentUsername và không phải là host
        this.listSeminarEvent = this.listSeminarEvent.filter(seminarEvent =>
          seminarEvent.eventUserList.filter(userJoin =>
            userJoin.user.username === this.currentUsername && userJoin.type === 1).length === 0);

        // Các phần tử cần làm khảo sát
        this.listSeminarEventWaiting = this.listSeminarEvent.filter(seminarEvent =>
          seminarEvent.eventUserList.filter(userJoin =>
            userJoin.user.username === this.currentUsername && userJoin.status !== 0).length === 0);

        // Các phần tử đã làm khảo sát
        this.listSeminarEventDone = this.listSeminarEvent.filter(seminarEvent =>
          seminarEvent.eventUserList.filter(userJoin =>
            userJoin.user.username === this.currentUsername && userJoin.status !== 0).length > 0)
      }
    });
  }

  onUpdateListSeminarEvent() {
    this.getSeminarEvaluationList();
  }

  open(content) {
    this.modalService.open(content, {backdrop: 'static', centered: true, size: 'lg'});
  }
}
