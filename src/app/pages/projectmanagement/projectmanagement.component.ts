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
  add: boolean = true;
  event;
  projects: Project[];
  newProject: Project;
  statusCode: number;
  projectIdEdit: number;
  editProject: Project;

  constructor(private projectService: ProjectService) {
    this.newProject = new Project();
  }

  ngOnInit() {
    this.getListProject();
  }

  Active(project: Project) {
    project.active = 1;
    this.projectService.updateProject(project).subscribe((response: Project) => {
      if (response.id === project.id && response.active === project.active) {
        this.getListProject();
      }
    });
  }

  Deactive(project: Project) {
    project.active = 0;
    this.projectService.updateProject(project).subscribe((response: Project) => {
      if (response.id === project.id && response.active === project.active) {
        this.getListProject();
      }
    });
  }

  addProject() {
    this.add = !this.add;
  }

  confirmAdd(event) {
    const code = (event.keyCode ? event.keyCode : event.which);
    if (event.keyCode === 13) {
      this.projectService.addNewProject(this.newProject).subscribe((response: ResponseProjectDTO) => {
        this.getListProject();
        this.statusCode = response.status_code;
        this.add = !this.add;
      });
    }
  }

  getListProject() {
    this.projectService.getAllProject().subscribe((response: ResponseProjectDTO) => {
      this.projects = response.data;
    }, error => {
      alert('Error');
    });
  }

  showEditBox(id: number) {
    this.projectIdEdit = id;
  }

  updateProjectName(project: Project, newName: string, event) {
    if (event.keyCode === 13) {
      project.name = newName;
      this.projectService.updateProject(project).subscribe((response: Project) => {
        if (response.id === project.id && response.name === project.name) {
          this.projectIdEdit = 0;
          this.getListProject();
        }
      });
    }
  }

}
