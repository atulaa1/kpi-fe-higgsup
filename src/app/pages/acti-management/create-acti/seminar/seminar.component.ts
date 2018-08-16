import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-seminar',
  templateUrl: './seminar.component.html',
  styleUrls: ['./seminar.component.scss'],
})
export class SeminarComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }
  closeSeminarModal() {
    this.activeModal.close();
  }
}
