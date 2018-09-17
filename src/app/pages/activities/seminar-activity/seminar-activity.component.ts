import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-seminar-activity',
  templateUrl: './seminar-activity.component.html',
  styleUrls: ['./seminar-activity.component.scss'],
})
export class SeminarActivityComponent implements OnInit {
  @Input() dismiss;
  constructor() { }

  ngOnInit() {
  }
  closeModal() {
    this.dismiss();
  }
}
