import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SeminarComponent} from './seminar/seminar.component';
import {ClubComponent} from './club/club.component';
import {TeamBuildingComponent} from './team-building/team-building.component';

@Component({
  selector: 'ngx-create-acti',
  templateUrl: './create-acti.component.html',
  styleUrls: ['./create-acti.component.scss'],
})
export class CreateActiComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openSeminarModal() {
    this.modalService.open(SeminarComponent);
  }
  openClubModal() {
    this.modalService.open(ClubComponent);
  }
  openTeamModal() {
    this.modalService.open(TeamBuildingComponent);
  }
}
