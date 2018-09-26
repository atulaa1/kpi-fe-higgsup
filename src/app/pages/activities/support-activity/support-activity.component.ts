import {Component, Input, OnInit} from '@angular/core';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {KpiDateFormatter} from '../../../modals/personal-info/kpi-date-formatter';
import {SupportService} from '../../../@core/services/support.service';

@Component({
  selector: 'ngx-support-activity',
  templateUrl: './support-activity.component.html',
  styleUrls: ['./support-activity.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: KpiDateFormatter}],
})
export class SupportActivityComponent implements OnInit {
  @Input() dismiss;
  supportEvents = [
    {name: 'Dọn dẹp', type: 'cleanUpPoint', checked: false},
    {name: 'Mua đồ', type: 'buyingStuffPoint', checked: false},
    {name: 'Support Hội thảo', type: 'supportConferencePoint', checked: false},
    {name: 'Training', type: 'trainingPoint', checked: false},
    {name: 'Vệ sinh hàng tuần', type: 'weeklyCleanUpPoint', checked: false}
  ];
  selectedSupportEvents = [];

  constructor(private supportService: SupportService) {
  }

  ngOnInit() {
  }


  closeModal() {
    this.dismiss();
  }

  change(supportEvent) {
    supportEvent.checked = !supportEvent.checked;
    if (supportEvent.checked === true) {
      this.selectedSupportEvents.push(supportEvent.type);
    } else {
      const updateItem = this.selectedSupportEvents.find(this.findIndexToUpdate, supportEvent.type);

      const index = this.selectedSupportEvents.indexOf(updateItem);

      this.selectedSupportEvents.splice(index, 1);
    }

  }

  findIndexToUpdate(supportEvent) {
    return supportEvent.type === this;
  }

  addSupportEvent() {
  console.log(this.selectedSupportEvents)
  }

}
