import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-team-building',
  templateUrl: './team-building.component.html',
  styleUrls: ['./team-building.component.scss'],
})
export class TeamBuildingComponent implements OnInit {

  constructor( private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
closeTeamModal() {
    this.activeModal.close();
}
}
