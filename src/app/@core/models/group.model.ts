import {Activity} from './activity.model';

export class Group<T> {
  id: number;
  name: string;
  description: string;
  groupType: Activity;
  createdDate: string;
  additionalConfig: T;
}
