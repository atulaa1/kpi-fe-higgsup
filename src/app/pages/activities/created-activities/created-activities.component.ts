import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from '../../../@core/services/activities.service';
import {Event} from '../../../@core/models/event.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataTransferService} from '../../../@core/services/dataTransfer.service';

@Component({
  selector: 'ngx-created-activities',
  templateUrl: './created-activities.component.html',
  styleUrls: ['./created-activities.component.scss'],
})
export class CreatedActivitiesComponent implements OnInit {
  showMsg: boolean = false;
  nameSearch: string;
  eventList: Array<Event> = new Array<Event>();
  eventListClone: Array<Event> = new Array<Event>();
  event: Event = new Event();

  constructor(private activitiesService: ActivitiesService, private modalService: NgbModal,
              private dataTransfer: DataTransferService) {
  }

  ngOnInit() {
    this.activitiesService.getCreatedEventUrl().subscribe(response => {
      if (response.status_code === 200) {
        this.eventList = response.data;
        this.eventListClone = Object.assign(this.eventList)
      }
    });
    this.dataTransfer.currentEvent.subscribe(event => {
      if (event.id !== null) {
        this.eventList.unshift(event);
      }
    });
  }

  handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.searchActivities();
    } else if (this.nameSearch === '') {
      this.searchActivities();
    }
  }

  searchNameActivities(activities) {
    return activities.name.toUpperCase().indexOf(this.nameSearch.toUpperCase()) >= 0
  }

  searchActivities() {
    this.showMsg = false;
    this.eventList = Object.assign(this.eventListClone);
    this.eventList = this.eventList.filter(value => this.searchNameActivities(value));
    if (this.eventList.length === 0) {
      this.showMsg = true;
    }
  }

  open(content) {
    this.modalService.open(content, {backdrop: 'static', centered: true, size: 'lg'});
  }

  onChange(eventDTO: Event) {
    const index = this.eventList.map(value => value.id).indexOf(eventDTO.id);
    if (index >= 0) {
      this.eventList.splice(index, 1, eventDTO);
    }
  }

}
