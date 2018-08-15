import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  boxx = false;
  showIc = false;

  constructor() {
  }

  fcShowmodal() {
    alert('test')
  }

  fcShowCheckbox() {
    this.showIc = !this.showIc;
  }

  clickBoxEnd() {
    this.boxx = !this.boxx;
  }

  ngOnInit() {
  }

}
