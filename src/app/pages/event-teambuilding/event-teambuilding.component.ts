import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TeambuildingActivityComponent} from './teambuilding-activity/teambuilding-activity.component';

@Component({
  selector: 'event-teambuilding',
  templateUrl: './event-teambuilding.component.html',
  styleUrls: ['./event-teambuilding.component.scss']
})
export class EventTeambuildingComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(TeambuildingActivityComponent, {backdrop: 'static', centered: true, size: 'lg'})
  }
}
