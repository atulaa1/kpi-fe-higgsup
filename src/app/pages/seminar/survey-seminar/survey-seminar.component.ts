import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'survey-seminar',
  templateUrl: './survey-seminar.component.html',
  styleUrls: ['./survey-seminar.component.scss']
})
export class SurveySeminarComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

}
