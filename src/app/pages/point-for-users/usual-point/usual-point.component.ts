import {Component, OnInit} from '@angular/core';
import {NormalPointModel} from '../../../@core/models/normal-point.model';
import {GetPointService} from '../../../@core/services/get-point.service';
import {MessageConstant} from '../../../@core/glossary/message.constant';

@Component({
  selector: 'ngx-usual-point',
  templateUrl: './usual-point.component.html',
  styleUrls: ['./usual-point.component.scss'],
})
export class UsualPointComponent implements OnInit {
  listPoint: NormalPointModel[];
  point: string = MessageConstant.MSG_POINT;
  lateComing: string = MessageConstant.MSG_LATECOMING;
  club: string = MessageConstant.MSG_CLUB;
  teamBuilding: string = MessageConstant.MSG_TEAMBUILDING;
  normalSeminar: string = MessageConstant.MSG_NORMALSEMINAR;
  weekendSeminar: string = MessageConstant.MSG_WEEKENDSEMINAR;
  support: string = MessageConstant.MSG_SUPPORT;
  evaluating: string = MessageConstant.MSG_EVALUATING;
  system: string = MessageConstant.MSG_SYSTEM;
  added: string = ' đã cộng ';
  index: number;

  constructor(private getPointService: GetPointService) {
  }

  ngOnInit() {
    // get list normal point
    this.getPointService.getNormalPoint().subscribe(res => {
      if (res.status_code === 200) {
        this.listPoint = res.data;
      }
    });
  }

  changeCollapsed(i) {
    this.index = i;
  }
}
