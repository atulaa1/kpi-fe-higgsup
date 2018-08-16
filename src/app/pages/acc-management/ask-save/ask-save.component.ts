import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'ask-save',
  templateUrl: './ask-save.component.html',
  styleUrls: ['./ask-save.component.scss']
})
export class AskSaveComponent implements OnInit {
  constructor(
    private bsModal: BsModalService,
  ) { }

  ngOnInit() {
  }
  cancelAskSave() {
    this.bsModal.hide(1);
  }
  // save() {
  //   this.show = !this.show;
  // }
  }
