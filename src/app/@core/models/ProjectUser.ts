import {Project} from './project.model';
import {User} from './user.model';

export class ProjectUser {
   id: number;
   project: Project;
   projectUser: User;
   joinedDate: Date;

  constructor() {
  }
}
