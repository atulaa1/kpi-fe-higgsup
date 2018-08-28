import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../@core/models/project.model';

@Component({
  selector: 'dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss'],
})
export class DialogConfirmationComponent implements OnInit {

  @Input() choosedProjectId
  @Input() msg: string;
  @Input() project: Project;
  @Input() dismiss;
  @Input() action: string;
  @Output() confirmation = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  cancel() {
    this.confirmation.emit(false);
    this.dismiss();
  }

  confirm() {
    this.confirmation.emit(true);
    this.dismiss();
  }
}
