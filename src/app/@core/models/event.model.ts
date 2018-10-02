import {Group} from './group.model';
import {Activity} from './activity.model';
import {UserType} from './userType.model';
import {CreatedActivity} from './createdActivity.model';
import {User} from './user.model';

export class Event {
  id: number;
  name: string;
  description: string;
  address: string;
  beginDate: string = '';
  endDate: string = '';
  createdDate: string;
  group: Group<Activity>;
  eventUserList: Array<UserType> = [];
  additionalConfig: CreatedActivity;
  status: number;
  creator: User;
}
