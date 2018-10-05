import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'teambuilding-activity',
  templateUrl: './teambuilding-activity.component.html',
  styleUrls: ['./teambuilding-activity.component.scss']
})
export class TeambuildingActivityComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close();
  }
}
