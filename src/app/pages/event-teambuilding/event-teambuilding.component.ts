import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'event-teambuilding',
  templateUrl: './event-teambuilding.component.html',
  styleUrls: ['./event-teambuilding.component.scss']
})
export class EventTeambuildingComponent implements OnInit {

  constructor(private bsModal: NgbModal) {
  }

  ngOnInit() {
  }

  openModalAddNewTBD() {
    this.bsModal.open('<h1>abcxyz</h1>', {centered: true});
  }
}
