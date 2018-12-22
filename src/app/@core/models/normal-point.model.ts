import {Point} from './point.model';

export class NormalPointModel {
  pointDetailList: Point[];
  pointTotal: {
    rulePoint: number;
    clubPoint: number;
    normalSeminarPoint: number;
    weekendSeminarPoint: number;
    supportPoint: number;
    teambuildingPoint: number;
    personalPoint: number;
    projectPoint: number;
    totalPoint: number;
    famedPoint: number;
    title: number;
  };
  yearMonth: {
    id: number;
    yearMonth: number;
  }
}
