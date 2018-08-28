import {Component, OnInit} from '@angular/core';
import {Project} from '../../@core/models/project.model';
import {ProjectService} from '../../@core/services/project.service';
import {ResponseProjectDTO} from '../../@core/models/response-project-dto.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'projectmanagement',
  templateUrl: './projectmanagement.component.html',
  styleUrls: ['./projectmanagement.component.scss'],
})
export class ProjectmanagementComponent implements OnInit {
  add: boolean = true;
  projects: Project[];
  newProject: Project;
  projectToEdit: Project;
  statusCode: number;
  projectIdEdit: number;
  editedProjectName: string;
  msg: string;
  actionType: string;
  currentProject: Project;

  constructor(private projectService: ProjectService,
              private bsModal: NgbModal) {
    this.newProject = new Project();
  }

  ngOnInit() {
    this.getListProject();
  }

  Active(project: Project, content) {
    this.actionType = 'EDIT';
    this.msg = 'Bạn đã đổi trạng thái của ' + project.name + ' thành Đang hoạt động';
    this.currentProject = Object.assign({}, project);
    this.currentProject.active = 1;
    this.bsModal.open(content, {backdrop: 'static', centered: true});
  }

  Deactive(project: Project, content) {
    this.actionType = 'EDIT';
    this.msg = 'Bạn đã đổi trạng thái của ' + project.name + ' thành Dừng hoạt động';
    this.currentProject = Object.assign({}, project);
    this.currentProject.active = 0;
    this.bsModal.open(content, {backdrop: 'static', centered: true});
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
        this.newProject = new Project();
        this.add = !this.add;
      });
    }
  }

  getListProject() {
    this.projectService.getAllProject().subscribe((response: ResponseProjectDTO) => {
      this.projects = response.data;
    });
  }

  showEditBox(project: Project) {
    this.projectToEdit = project;
    this.projectIdEdit = project.id;
    this.editedProjectName = project.name;
  }

  updateProjectName(project: Project, editName: string, content) {
    this.actionType = 'EDIT';
    this.msg = 'Bạn đã đổi tên ' + project.name + ' thành ' + editName;
    this.currentProject = Object.assign({}, project);
    this.currentProject.name = editName
    this.bsModal.open(content, {backdrop: 'static', centered: true});
  }

  deleteProject(project: Project, content) {
    this.actionType = 'DELETE';
    this.msg = 'Bạn có chắc muốn xóa ' + project.name + '?';
    this.currentProject = Object.assign({}, project);
    this.bsModal.open(content, {backdrop: 'static', centered: true});
  }

  receiveConfirmation($event) {
    if ($event === true) {
      if (this.actionType === 'DELETE') {
        this.projectService.deleteProject(this.currentProject).subscribe((response: ResponseProjectDTO) => {
          if (response.status_code === 200) {
            this.currentProject = null;
            this.actionType = null;
            this.getListProject();
          }
        });
      } else if (this.actionType === 'EDIT') {
        this.projectService.updateProject(this.currentProject).subscribe((response: ResponseProjectDTO) => {
          if (response.status_code === 200) {
            this.projectIdEdit = 0;
            this.currentProject = null;
            this.actionType = null;
            this.getListProject();
          }
        });
      }
    } else {
      this.projectIdEdit = 0;
    }
  }
}
