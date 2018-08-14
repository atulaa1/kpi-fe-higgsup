import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  boxx = false;

  constructor() {
  }

  clickBoxEnd() {
    this.boxx = !this.boxx;
  }

  ngOnInit() {
  }

}
