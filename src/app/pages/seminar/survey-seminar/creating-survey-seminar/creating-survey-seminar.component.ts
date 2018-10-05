import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'creating-survey-seminar',
  templateUrl: './creating-survey-seminar.component.html',
  styleUrls: ['./creating-survey-seminar.component.scss'],
})
export class CreatingSurveySeminarComponent implements OnInit {
  @Input() dismiss;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.dismiss();
  }
}
