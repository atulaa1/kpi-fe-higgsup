import {Component, Input, OnInit} from '@angular/core';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {KpiDateFormatter} from '../../../modals/personal-info/kpi-date-formatter';

@Component({
  selector: 'ngx-seminar-activity',
  templateUrl: './seminar-activity.component.html',
  styleUrls: ['./seminar-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class SeminarActivityComponent implements OnInit {
  @Input() dismiss;
  time = {hour: 12, minute: 0o0};
  spinners: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  closeModal() {
    this.dismiss();
  }
}
