import {Activity} from "./activity.model";

export class Group<T> {
  id: number;
  name: string;
  description: string;
  groupTypeId: Activity;
  createdDate: string;
  additionalConfig: T;
}
