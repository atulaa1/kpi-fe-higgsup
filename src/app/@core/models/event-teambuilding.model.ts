import {Group} from './group.model';
import {UserType} from './userType.model';

export class EventTeambuilding<T> {
  name: string;
  address: string;
  beginDate: Date;
  group: Group<T>;
  eventUserList: Array<UserType>;
}
