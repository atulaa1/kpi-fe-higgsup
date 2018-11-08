import {Component, OnInit} from '@angular/core';
import {Point} from '../../../@core/models/point.model';

@Component({
  selector: 'ngx-fame-point',
  templateUrl: './fame-point.component.html',
  styleUrls: ['./fame-point.component.scss'],
})
export class FamePointComponent implements OnInit {
  listMonthPoint: Array<Point> = new Array<Point>();
  isCollapsed: boolean = false;

  constructor() {

    // Call fake order
    this.getMonthPoint();
  }

// Fake month's point

  getMonthPoint() {
    const monthPoint1: Point = new Point();
    monthPoint1.month = 'Tháng 1';
    monthPoint1.point = 21;
    this.listMonthPoint.push(monthPoint1);

    const monthPoint2: Point = new Point();
    monthPoint2.month = 'Tháng 2';
    monthPoint2.point = 22;
    this.listMonthPoint.push(monthPoint2);

    const monthPoint3: Point = new Point();
    monthPoint3.month = 'Tháng 3';
    monthPoint3.point = 23;
    this.listMonthPoint.push(monthPoint3);

    const monthPoint4: Point = new Point();
    monthPoint4.month = 'Tháng 4';
    monthPoint4.point = 24;
    this.listMonthPoint.push(monthPoint4);

    const monthPoint5: Point = new Point();
    monthPoint5.month = 'Tháng 5';
    monthPoint5.point = 25;
    this.listMonthPoint.push(monthPoint5);

    const monthPoint6: Point = new Point();
    monthPoint6.month = 'Tháng 6';
    monthPoint6.point = 26;
    this.listMonthPoint.push(monthPoint6);

    const monthPoint7: Point = new Point();
    monthPoint7.month = 'Tháng 7';
    monthPoint7.point = 27;
    this.listMonthPoint.push(monthPoint7);

    const monthPoint8: Point = new Point();
    monthPoint8.month = 'Tháng 8';
    monthPoint8.point = 28;
    this.listMonthPoint.push(monthPoint8);

    const monthPoint9: Point = new Point();
    monthPoint9.month = 'Tháng 9';
    monthPoint9.point = 29;
    this.listMonthPoint.push(monthPoint9);

    const monthPoint10: Point = new Point();
    monthPoint10.month = 'Tháng 10';
    monthPoint10.point = 20;
    this.listMonthPoint.push(monthPoint10);

    const monthPoint11: Point = new Point();
    monthPoint11.month = 'Tháng 11';
    monthPoint11.point = 21;
    this.listMonthPoint.push(monthPoint11);

    const monthPoint12: Point = new Point();
    monthPoint12.month = 'Tháng 12';
    monthPoint12.point = 22;
    this.listMonthPoint.push(monthPoint12);

  }

  ngOnInit() {
  }

}
