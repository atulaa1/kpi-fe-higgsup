import { Component, OnInit } from '@angular/core';
import {Point} from '../../../@core/models/point.model';

@Component({
  selector: 'ngx-usual-point',
  templateUrl: './usual-point.component.html',
  styleUrls: ['./usual-point.component.scss'],
})
export class UsualPointComponent implements OnInit {
  listPoint: Array<Point> = new Array<Point>();

  constructor() {
    // fake Listpoint
    this.getListUsualPoint();
  }

  // Fake list usual point
  getListUsualPoint() {
    const activity1: Point = new Point();
    activity1.point = 10;
    activity1.type = 'Điểm hoạt động';
    this.listPoint.push(activity1);

    const activity2: Point = new Point();
    activity2.point = 25;
    activity2.type = 'Điểm teambuilding';
    this.listPoint.push(activity2);

    const activity3: Point = new Point();
    activity3.point = -5;
    activity3.type = 'Điểm đi muộn';
    this.listPoint.push(activity3);

    const activity4: Point = new Point();
    activity4.point = 2;
    activity4.type = 'Điểm dọn dẹp';
    this.listPoint.push(activity4);

    const activity5: Point = new Point();
    activity5.point = 5;
    activity5.type = 'Điểm seminar';
    this.listPoint.push(activity5);

    const activity6: Point = new Point();
    activity6.point = 100;
    activity6.type = 'Điểm vì thích thì cộng cho thôi';
    this.listPoint.push(activity6);
  }

  ngOnInit() {}

}
