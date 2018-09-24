import {EventAdditionalConfig} from './eventAdditionalConfig.model';
import {Group} from './group.model';

export class Event<T> {
  id: number;
  name: string;
  description: string;
  status: string;
  address: string;
  createdDate: string;
  updatedDate: string;
  beginDate: string;
  endDate: string;
  group: Group<T>;
  eventUserList: T;
  additionalConfig: Array<EventAdditionalConfig>;
}
