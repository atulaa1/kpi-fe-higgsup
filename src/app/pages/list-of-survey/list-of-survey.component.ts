import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PersonalSurveyComponent} from './modal-kscn/modal-kscn.component';
import {SeminarSurveyComponent} from './kssml/kssml.component';

@Component({
  selector: 'list-of-survey',
  templateUrl: './list-of-survey.component.html',
  styleUrls: ['./list-of-survey.component.scss'],
})
export class ListOfSurveyComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openPersonalSurvey() {
    this.modalService.open(PersonalSurveyComponent, {backdrop: 'static', centered: true});
  }

  openSeminarSurvey() {
    this.modalService.open(SeminarSurveyComponent, {backdrop: 'static', centered: true});
  }
}
