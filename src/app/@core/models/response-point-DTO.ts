import {Error} from './error.model';

export class ResponsePointDTO<T> {
  status_code: number;
  data: T;
  message: string;
  errors: Array<Error>;
}
