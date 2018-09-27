import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'notice-box',
  templateUrl: './notice-box.component.html',
  styleUrls: ['./notice-box.component.scss']
})
export class NoticeBoxComponent implements OnInit {

  @Input() msg: string;
  @Input() title: string;
  @Input() errorContent: string;
  @Input() dismiss;
  @Output() confirmation = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.confirmation.emit(true);
    this.dismiss();
  }

  cancel() {
    this.confirmation.emit(false);
    this.dismiss();
  }
}
