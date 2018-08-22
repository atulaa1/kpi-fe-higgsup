import {Component, OnInit} from '@angular/core';
import {Project} from '../../@core/models/project.model';
import {ProjectService} from '../../@core/services/project.service';
import {ResponseProjectDTO} from '../../@core/models/response-project-dto.model';

@Component({
  selector: 'projectmanagement',
  templateUrl: './projectmanagement.component.html',
  styleUrls: ['./projectmanagement.component.scss'],
})
export class ProjectmanagementComponent implements OnInit {
  active: boolean = true;
  add: boolean = true;
  event;
  projects: Project[];
  newProject = new Project();

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.getListProject();
    // this.confirmAdd(event);
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
      this.projectService.addNewProject(this.newProject);
      this.getListProject();
      this.add = !this.add;
    }
  }

  getListProject() {
    this.projectService.getAllProject().subscribe((response: ResponseProjectDTO) => {
      this.projects = response.data;
    });
  }
}
