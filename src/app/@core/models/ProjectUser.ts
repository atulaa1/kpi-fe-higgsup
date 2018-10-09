import {Project} from './project.model';
import {User} from './user.model';

export class ProjectUser {
  private id: number;
  private project: Project;
  private projectUser: User;
  private joinedDate: Date;

  constructor() {
  }
}
