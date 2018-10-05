import {Event} from '../models/event.model';
export class ResponseListEventDTO {
  data: Array<Event>;
  status_code: number;
  message: string;
}
