import {User} from './user.model';

export class ResponseDTO {
  status: string;
  data: User;
  message: string;
}
