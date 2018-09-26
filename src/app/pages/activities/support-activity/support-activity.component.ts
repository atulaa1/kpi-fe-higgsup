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
    {id: 1, name: 'Dọn dẹp', type: 'cleanUpPoint', status: false, quantity: 1},
    {id: 2, name: 'Mua đồ', type: 'buyingStuffPoint', status: false, quantity: 1},
    {id: 3, name: 'Support Hội thảo', type: 'supportConferencePoint', status: false, quantity: 1},
    {id: 4, name: 'Training', type: 'trainingPoint', status: false, quantity: 1},
    {id: 5, name: 'Vệ sinh hàng tuần', type: 'weeklyCleanUpPoint', status: false, quantity: 1},
  ];
  selectedSupportEvents = [];

  constructor(private supportService: SupportService) {
  }

  ngOnInit() {
    for (let i = 0; i < this.supportEvents.length; i++) {
      this.supportEvents[i].status = false;
    }
  }


  closeModal() {
    this.dismiss();
  }

  change(supportEvent, event) {
    if (event.target.checked === true) {
      supportEvent.status = true;
      this.selectedSupportEvents.push(supportEvent);
    } else {
      const updateItem = this.selectedSupportEvents.find(this.findIndexToUpdate, supportEvent.type);

      const index = this.selectedSupportEvents.indexOf(updateItem);

      this.selectedSupportEvents.splice(supportEvent, 1);
      supportEvent.status = false;
    }

  }

  findIndexToUpdate(supportEvent) {
    return supportEvent.type === this;
  }

  addSupportEvent() {
    // for (let i = 0; i < this.selectedSupportEvents.length; i++) {
    //
    // }
    console.log(this.selectedSupportEvents);
  }

}
