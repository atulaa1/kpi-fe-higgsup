export class Project {
  id: number;
  name: string;
  active: number;
  createdDate: string;
  updatedDate: string;
  isRated: boolean;

  constructor() {
    this.active = 1;
  }
}
