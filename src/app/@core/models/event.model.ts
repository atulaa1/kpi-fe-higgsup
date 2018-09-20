import {Activity} from './activity.model';
import {EventUser} from './eventUser.model';

export class Event {
  id: number;
  name: string;
  description: string;
  address: string;
  group: Activity;
  beginDate: string;
  endDate: string;
  eventUserList: Array<EventUser>;
}
