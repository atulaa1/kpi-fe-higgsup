import {Group} from './group.model';
import {Activity} from './activity.model';
import {UserType} from './userType.model';
import {CreatedActivity} from './createdActivity.model';

export class EventSupport {

  name: string;
  description: string;
  address: string;
  beginDate: string;
  endDate: string;
  createdDate: string;
  group: Group<Activity>;
  eventUserList: Array<UserType>;
  additionalConfig: Array<any>;
}
