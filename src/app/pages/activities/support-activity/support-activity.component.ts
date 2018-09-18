import {Component, Input, OnInit} from '@angular/core';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {KpiDateFormatter} from '../../../modals/personal-info/kpi-date-formatter';

@Component({
  selector: 'ngx-support-activity',
  templateUrl: './support-activity.component.html',
  styleUrls: ['./support-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class SupportActivityComponent implements OnInit {
  @Input() dismiss;
  constructor() { }

  ngOnInit() {
  }
  closeModal() {
    this.dismiss();
  }
}
