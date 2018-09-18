import {Component, Input, OnInit} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {KpiDateFormatter} from '../../../modals/personal-info/kpi-date-formatter';

@Component({
  selector: 'ngx-club-activity',
  templateUrl: './club-activity.component.html',
  styleUrls: ['./club-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class ClubActivityComponent implements OnInit {
  @Input() dismiss;
  time = {hour: 12, minute: 0o0};
  spinners: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }
  closeModal() {
    this.dismiss();
  }

}
