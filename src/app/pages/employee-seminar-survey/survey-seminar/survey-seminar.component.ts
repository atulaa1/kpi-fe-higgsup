import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreatingSurveySeminarComponent} from './creating-survey-seminar/creating-survey-seminar.component';
import {SeminarService} from '../../../@core/services/seminar.service';
import {Event} from '../../../@core/models/event.model';
import {ResponseListEventDTO} from '../../../@core/models/responseListEventDTO.model';
import {User} from '../../../@core/models/user.model';
import {getMonth} from 'ngx-bootstrap/chronos';
import {getFullYear} from 'ngx-bootstrap/chronos/utils/date-getters';

@Component({
  selector: 'survey-seminar',
  templateUrl: './survey-seminar.component.html',
  styleUrls: ['./survey-seminar.component.scss'],
})
export class SurveySeminarComponent implements OnInit {
  listSeminarEvent: Array<Event> = new Array<Event>();
  listSeminarEventClone: Array<Event> = new Array<Event>();
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
  showMsg: boolean = false;
  selected: string = '';

  constructor(private modalService: NgbModal, private seminarService: SeminarService) {
  }

  ngOnInit() {
    this.currentUsername = JSON.parse(localStorage.getItem('currentUser')).username;
    this.getSeminarEvaluationList();
    for (let i = 2018; i <= (new Date()).getFullYear(); i++) {
      const currentYear = getFullYear(new Date());
      this.listYear.push(i);
      if (currentYear === i) {
        this.yearStatus = i.toString();
      }

    }
    for (let i = 1; i <= 12; i++) {
      const currentMonth = getMonth(new Date()) + 1;
      this.listMonth.push(i);
      if (currentMonth === i) {
        this.monthStatus = i.toString();
      }
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
        this.sortList(this.listSeminarEvent);
        this.listSeminarEventClone = Object.assign(this.listSeminarEvent);
      }
      this.onFilterSurvey();
    });
  }

  sortList(list: Array<Event>) {
    let all: Array<Event> = new Array<Event>();

    // Các phần tử cần làm khảo sát
    this.listSeminarEventWaiting = list.filter(seminarEvent =>
      seminarEvent.eventUserList.filter(userJoin =>
        userJoin.user.username === this.currentUsername && userJoin.status !== 0).length === 0);
    this.listSeminarEventWaitingClone = Object.assign(this.listSeminarEventWaiting);

    // Các phần tử đã làm khảo sát
    this.listSeminarEventDone = list.filter(seminarEvent =>
      seminarEvent.eventUserList.filter(userJoin =>
        userJoin.user.username === this.currentUsername && userJoin.status !== 0).length > 0);
    this.listSeminarEventDoneClone = Object.assign(this.listSeminarEventDone);

    all = all.concat(this.listSeminarEventWaitingClone);
    all = all.concat(this.listSeminarEventDoneClone);
    this.listSeminarEvent = all;
  }

  onUpdateListSeminarEvent() {
    this.getSeminarEvaluationList();
  }

  open(content) {
    this.modalService.open(content, {backdrop: 'static', centered: true, size: 'lg'});
  }

  onFilterSurvey() {
    this.listSeminarEvent = Object.assign(this.listSeminarEventClone);
    this.filterMonth();
    this.filterYear();
    this.filterStatus();
  }

  // Filter with month
  filterMonth() {
    if (parseInt(this.monthStatus, 10) !== 0) {
      this.listSeminarEvent = this.listSeminarEvent.filter(event =>
        parseInt(event.createdDate.slice(3, 5), 10) === parseInt(this.monthStatus, 10));
    }
    this.sortList(this.listSeminarEvent);
  }

  // filter with year
  filterYear() {
    if (parseInt(this.yearStatus, 10) !== 0) {
      this.listSeminarEvent = this.listSeminarEvent.filter(event =>
        parseInt(event.createdDate.slice(6, 10), 10) === parseInt(this.yearStatus, 10));
    }
    this.sortList(this.listSeminarEvent);
  }

  // filter with status
  filterStatus() {
    if (parseInt(this.confirmationStatus, 10) === 1) {
      this.listSeminarEvent = this.filterByStatus(0);
    }
    if (parseInt(this.confirmationStatus, 10) === 2) {
      this.listSeminarEvent = this.filterByStatus(1);
    }
    this.sortList(this.listSeminarEvent);
  }

  filterByStatus(status) {
    return this.listSeminarEvent.filter(event => {
      let isHas: boolean = false;
      event.eventUserList.forEach(value => {
        if (value.user.username === this.currentUsername) {
          if (value.status === status) {
            isHas = true;
            return;
          }
        }
      });
      return isHas;
    });
  }

}
