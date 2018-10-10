import {ProjectUser} from './ProjectUser';

export class Project {
  id: number;
  name: string;
  active: number;
  createdDate: string;
  updatedDate: string;
  projectUserList: Array<ProjectUser>;

  constructor() {
    this.active = 1;
  }
}
