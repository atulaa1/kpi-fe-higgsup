import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'projectmanagement',
  templateUrl: './projectmanagement.component.html',
  styleUrls: ['./projectmanagement.component.scss'],
})
export class ProjectmanagementComponent implements OnInit {
  active: boolean = true;
  add: boolean = true;
  event;

  constructor() {
  }

  ngOnInit() {
  }

  Active() {
    this.active = !this.active;
  }

  Deactive() {
    this.active = !this.active;
  }

  addProject() {
    this.add = !this.add;
  }

  confirmAdd(event) {
    const code = (event.keyCode ? event.keyCode : event.which);
    if (event.keyCode === 13) {
      this.add = !this.add;
    }
  }
}
