import {Employee} from './employee.model';

export class Question {
  id: number;
  number: number;
  question: string;
  isCollapsed: boolean;
  userList: Array<Employee> = new Array<Employee>();
}
