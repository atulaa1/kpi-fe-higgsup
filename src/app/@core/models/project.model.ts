export class Project {
  id: number;
  name: string;
  active: number;
  createdDate: string;
  updatedDate: string;

  constructor() {
    this.active = 1;
  }
}
