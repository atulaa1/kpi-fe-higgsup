import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-support-activity',
  templateUrl: './support-activity.component.html',
  styleUrls: ['./support-activity.component.scss'],
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
