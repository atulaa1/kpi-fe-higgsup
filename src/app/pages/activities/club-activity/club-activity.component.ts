import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-club-activity',
  templateUrl: './club-activity.component.html',
  styleUrls: ['./club-activity.component.scss'],
})
export class ClubActivityComponent implements OnInit {
  @Input() dismiss;
  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.dismiss();
  }
}
