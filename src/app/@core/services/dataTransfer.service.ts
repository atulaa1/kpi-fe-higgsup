import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Event} from '../models/event.model';

@Injectable()
export class DataTransferService {

  eventSource = new BehaviorSubject(new Event());
  currentEvent = this.eventSource.asObservable();

  constructor() {
  }

  addConfirmation(event) {
    this.eventSource.next(event);
  }

}
