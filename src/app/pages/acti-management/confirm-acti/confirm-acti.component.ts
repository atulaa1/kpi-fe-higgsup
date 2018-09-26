import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ClubComponent} from './club/club.component';

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
    this.modalService.open(ClubComponent)
  }
}
