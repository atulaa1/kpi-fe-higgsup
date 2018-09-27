import {Error} from './error.model';

export class ResponDTOLateInfo<T> {
  status_code: number;
  data: T;
  message: string;
  errors: Array<Error>;
}
