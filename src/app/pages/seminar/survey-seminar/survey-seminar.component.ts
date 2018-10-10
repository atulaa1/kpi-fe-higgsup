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
  listSeminarEventWaitingClone: Array<Event> = new Array<Event>();
  listSeminarEventDone: Array<Event> = new Array<Event>();
  listSeminarEventDoneClone: Array<Event> = new Array<Event>();
  currentUsername: string = '';
  confirmationStatus: string = '0';
  monthStatus: string = '0';
  yearStatus: string = '0';
  listMonth = [];
  listYear = [];

  constructor(private modalService: NgbModal, private seminarService: SeminarService) {
  }

  ngOnInit() {
    this.currentUsername = JSON.parse(localStorage.getItem('currentUser')).username;
    this.getSeminarEvaluationList();
    for (let i = 2018; i <= (new Date()).getFullYear(); i++) {
      this.listYear.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      this.listMonth.push(i);
    }
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
        this.listSeminarEventWaitingClone = Object.assign(this.listSeminarEventWaiting);

        // Các phần tử đã làm khảo sát
        this.listSeminarEventDone = this.listSeminarEvent.filter(seminarEvent =>
          seminarEvent.eventUserList.filter(userJoin =>
            userJoin.user.username === this.currentUsername && userJoin.status !== 0).length > 0)
        this.listSeminarEventDoneClone = Object.assign(this.listSeminarEventDone);
      }
    });
  }

  onUpdateListSeminarEvent() {
    this.getSeminarEvaluationList();
  }

  open(content) {
    this.modalService.open(content, {backdrop: 'static', centered: true, size: 'lg'});
  }

  onFilterSurvey() {
    if (parseInt(this.monthStatus, 10) !== 0) {
      this.keepOrigin();
      this.filterMonth();
      if (parseInt(this.yearStatus, 10) !== 0) {
        this.keepOrigin();
        this.filterMonth();
        this.filterYear();
        if (parseInt(this.confirmationStatus, 10) !== 0) {
          this.keepOrigin();
          this.filterMonth();
          this.filterYear();
          this.filterStatus();
        }
      }
    } else {
      this.keepOrigin();
    }
  }

  // Filter with month
  filterMonth() {
    this.listSeminarEventWaiting = this.listSeminarEventWaiting.filter(event =>
      parseInt(event.createdDate.slice(3, 5), 10) === parseInt(this.monthStatus, 10));
    this.listSeminarEventDone = this.listSeminarEventDone.filter(event =>
      parseInt(event.createdDate.slice(3, 5), 10) === parseInt(this.monthStatus, 10));
  }

  // filter with year
  filterYear() {
    this.listSeminarEventWaiting = this.listSeminarEventWaiting.filter(event =>
      parseInt(event.createdDate.slice(6, 10), 10) === parseInt(this.yearStatus, 10));
    this.listSeminarEventDone = this.listSeminarEventDone.filter(event =>
      parseInt(event.createdDate.slice(6, 10), 10) === parseInt(this.yearStatus, 10));
  }

  // filter with status
  filterStatus() {
    if (parseInt(this.confirmationStatus, 10) === 1) {
      this.listSeminarEventDone = [];
    } else if (parseInt(this.confirmationStatus, 10) === 2) {
      this.listSeminarEventWaiting = [];
    }
  }

  // keep Original
  keepOrigin() {
    this.listSeminarEventDone = this.listSeminarEventDoneClone;
    this.listSeminarEventWaiting = this.listSeminarEventWaitingClone;
  }

}
