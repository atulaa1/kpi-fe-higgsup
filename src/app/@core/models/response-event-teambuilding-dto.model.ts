import {Event} from './event.model';

export class ResponseEventTeambuildingDTO {
  data: Array<Event>;
  status_code: number;
  message: string;
}
