import {Component, Input, OnInit} from '@angular/core';
import {CreatedActivity} from '../../../../@core/models/createdActivity.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  @Input() createdActivity: CreatedActivity = new CreatedActivity();
  @Input() activityName: string = '';
  @Input() dismiss;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  onClose() {
    this.activeModal.close();
  }
}
