import { Component, OnInit } from '@angular/core';
import {  TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'seminar-survey',
  templateUrl: './kssml.component.html',
  styleUrls: ['./kssml.component.scss'],
})
export class SeminarSurveyComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private activeModal: NgbActiveModal) { }
  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close();
  }

}
