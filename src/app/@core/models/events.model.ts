
import {Group} from './group.model';
import {User} from './user.model';

export class Events {
  id: number;
  name: string;
  description: string
  status: number;
  address: string;
  createdDate: string;
  updatedDate: string;
  beginDate: string;
  endDate: string;
  group: Group<T>;
  eventUserList: User;
}
