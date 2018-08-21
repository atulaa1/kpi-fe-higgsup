export class Group<T> {
  id: number;
  name: string;
  description: string;
  groupTypeId: T;
  createdDate: string;
  additionalConfig: T;
}
