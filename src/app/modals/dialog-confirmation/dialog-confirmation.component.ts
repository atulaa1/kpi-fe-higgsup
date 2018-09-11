import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../@core/models/project.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss'],
})
export class DialogConfirmationComponent implements OnInit {

  @Input() choosedProjectId;
  @Input() msg: string;
  @Input() project: Project;
  @Input() dismiss;
  @Input() action: string;
  @Input() buttonTitle: string;
  @Output() confirmation = new EventEmitter<boolean>();

  constructor(private activeModal: NgbActiveModal) {
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

  close() {
    this.confirmation.emit(true);
    this.activeModal.close();
  }
}
