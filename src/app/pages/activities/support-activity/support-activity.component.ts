import {Component, Input, OnInit} from '@angular/core';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {KpiDateFormatter} from '../../../modals/personal-info/kpi-date-formatter';
import {SupportService} from '../../../@core/services/support.service';
import {Event} from '../../../@core/models/event.model';
import {EventAdditionalConfig} from '../../../@core/models/eventAdditionalConfig.model';


@Component({
  selector: 'ngx-support-activity',
  templateUrl: './support-activity.component.html',
  styleUrls: ['./support-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class SupportActivityComponent implements OnInit {
  @Input() dismiss;
  showInput: boolean = false;
  supportNumber: number = 0;
  supportEvent: Event<EventAdditionalConfig>;
  supportActivity = {
    clearUp : null,
    shopping : null,
    supportSeminor : null,
    cleaningWeek : null,
    training : null,
  }
  constructor(private supportService: SupportService) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.dismiss();
  }

  onSubmit() {

  }

  addSupport() {
    this.supportService.createEventSupport(this.supportEvent).subscribe(response => {
      this.supportEvent = response.data;
    })
  }

  openInputNumber() {
    this.showInput = !this.showInput;
    this.supportNumber = 1;
  }

}
