import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreatingSurveySeminarComponent} from './creating-survey-seminar/creating-survey-seminar.component';

@Component({
  selector: 'survey-seminar',
  templateUrl: './survey-seminar.component.html',
  styleUrls: ['./survey-seminar.component.scss']
})
export class SurveySeminarComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  open() {
    this.modalService.open(CreatingSurveySeminarComponent, {backdrop: 'static', centered: true, size: 'lg'})
  }
}
