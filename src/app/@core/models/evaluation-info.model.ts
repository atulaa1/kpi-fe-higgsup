import {Project} from './project.model';
import {User} from './user.model';
import {Question} from './question.model';

export class EvaluationInfo {
  projectList: Array<Project>;
  employeeList: Array<User>;
  questionList: Array<Question>;
}
