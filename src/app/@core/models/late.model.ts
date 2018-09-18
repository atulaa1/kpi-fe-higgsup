import {User} from './user.model';

export class Late<T> {
  id: number;
  lastTimes: number;
  userInfo: T;
}
