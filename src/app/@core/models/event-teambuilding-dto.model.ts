import {Group} from './group.model';
import {ParticipantTeambuilding} from './participant-teambuilding.model';

export class EventTeambuildingDTO<T> {
  name: string;
  address: string;
  beginDate: Date;
  group: Group<T>;
  eventUserList: Array<ParticipantTeambuilding>;
}
