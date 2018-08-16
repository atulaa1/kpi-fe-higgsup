import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'modal-kscn',
  templateUrl: './modal-kscn.component.html',
  styleUrls: ['./modal-kscn.component.scss'],
})
export class ModalKscnComponent implements OnInit {
  modalRef: BsModalRef;
  editText = false;
  kscnBinding = 'Câu 1: Nhân viên này có hoàn thành tốt công việc hàng ngày';
  constructor(private modalService: BsModalService) {
  }
  clickShowInput() {
    this.editText = !this.editText;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  editKscn() {
    alert('kaka')
  }

  ngOnInit() {
  }

}
