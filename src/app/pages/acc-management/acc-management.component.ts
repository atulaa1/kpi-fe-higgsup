import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AskSaveComponent} from './ask-save/ask-save.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'acc-management',
  templateUrl: './acc-management.component.html',
  styleUrls: ['./acc-management.component.scss'],
})
export class AccManagementComponent implements OnInit {

  constructor(
    private bsModal: NgbModal,
  ) { }
  show = true;
  select = 'Man';
  logoutModal: NgbModalRef;
  ngOnInit() {
  }
  myFunction() {
    let input, filter, managementContent, div, p, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    managementContent = document.getElementById('managementContent');
    div = managementContent.getElementsByTagName('div');
    for (i = 0; i < div.length; i++) {
      p = div[i].getElementsByTagName('p')[0];
      if (p.innerHTML.toUpperCase().indexOf(filter) > -1) {
        div[i].style.display = '';
      } else {
        div[i].style.display = 'none';
      }
    }
  }
  edit(){
    this.show = !this.show;
  }
  save(){
    this.show = !this.show;
  }
  openAskSaveModal() {
    // this.bsModal.show(AskSaveComponent);
    this.logoutModal = this.bsModal.open(AskSaveComponent);
  }
}
