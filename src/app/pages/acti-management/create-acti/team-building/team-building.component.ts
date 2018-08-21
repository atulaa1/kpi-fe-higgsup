import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TeambuildingService} from '../../../../@core/services/teambuilding.service';
import {Group} from '../../../../@core/models/Group.model';
import {CreatedActivity} from '../../../../@core/models/CreatedActivity.model';

@Component({
  selector: 'ngx-team-building',
  templateUrl: './team-building.component.html',
  styleUrls: ['./team-building.component.scss'],
})
export class TeamBuildingComponent implements OnInit {
  @Input() createdActivity: CreatedActivity = new CreatedActivity();
  @Input() activityName: string = '';
  @Input() dismiss;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  onClose() {
    this.activeModal.close();
  }

}
