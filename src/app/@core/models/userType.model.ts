import {User} from './user.model';
import {SeminarSurvey} from './seminarSurvey.model';

export class UserType {
  user: User;
  type: number;
  status: number;
  seminarSurveys: Array<SeminarSurvey>;
}
