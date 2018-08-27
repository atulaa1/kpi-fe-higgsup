import {Project} from './project.model';

export class ResponseProjectDTO {
  data: Array<Project>;
  status_code: number;
}
