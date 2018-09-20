import {User} from './user.model';

export class ResponseUserDTO {
  status_code: number;
  data: Array<User>;
  message: string;
}
