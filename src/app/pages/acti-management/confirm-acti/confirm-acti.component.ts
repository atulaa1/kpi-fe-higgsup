import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SupportComponent} from './confirmSupport/support.component';
import {ClubActivityComponent} from '../../activities/club-activity/club-activity.component';


@Component({
  selector: 'confirm-acti',
  templateUrl: './confirm-acti.component.html',
  styleUrls: ['./confirm-acti.component.scss']
})
export class ConfirmActiComponent implements OnInit {
  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  open() {
    this.modalService.open(ClubActivityComponent,{backdrop: 'static', centered: true, size: 'lg'})
  }
}
