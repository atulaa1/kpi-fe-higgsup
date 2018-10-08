import {Group} from './group.model';
import {Activity} from './activity.model';
import {UserType} from './userType.model';
import {CreatedActivity} from './createdActivity.model';
import {User} from './user.model';
import {SeminarSurvey} from './seminarSurvey.model';

export class EventSeminar {
  id: number = null;
  name: string;
  description: string;
  address: string;
  beginDate: string = '';
  endDate: string = '';
  createdDate: string;
  group: Group<Activity>;
  eventUserList: Array<UserType> = [];
  additionalConfig: Array<SeminarSurvey>;
  status: number;
  creator: User;
  updatedDate: string;
}
