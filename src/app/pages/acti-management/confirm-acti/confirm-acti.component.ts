import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivitiesConfirmService} from '../../../@core/services/activities-confirm.service';


@Component({
  selector: 'confirm-acti',
  templateUrl: './confirm-acti.component.html',
  styleUrls: ['./confirm-acti.component.scss']
})
export class ConfirmActiComponent implements OnInit {
  listActivities: Array<any>;
  listActivitiesClone: Array<any>;
  @Input() dismiss;
  message: string;
  nameSearch: string;
  showMsg: boolean = false;

  constructor(private modalService: NgbModal,
              private activitiesConfirm: ActivitiesConfirmService) {
  }

  ngOnInit() {
    this.activitiesConfirm.getListActivitiesConfirm().subscribe(response => {
      this.listActivities = response.data;
      this.listActivitiesClone = Object.assign(this.listActivities);

    })
  }

  open(content) {
    this.modalService.open(content, {backdrop: 'static', centered: true, size: 'lg'});
  }

  onChange($event) {
    this.activitiesConfirm.getListActivitiesConfirm().subscribe(response => {
      if (response.status_code === 200) {
        this.listActivities = response.data;
      }
    });
  }
  onChangeFilter(value) {
    this.listActivities = this.listActivitiesClone;
    const valueNum = parseInt(value);
    if (valueNum !== 0)
      this.listActivities = this.listActivities.filter(item => item.status === valueNum);
  }

  closeModal() {
    this.dismiss();
  }
}
