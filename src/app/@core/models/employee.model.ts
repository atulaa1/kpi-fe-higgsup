import {Question} from './question.model';

export class Employee {
  fullname: string;
  isRated: boolean;
  rating: number;
  listRating: Array<number> = [];
}
