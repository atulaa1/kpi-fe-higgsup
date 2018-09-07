import {Component, OnInit, Pipe} from '@angular/core';
import {Project} from '../../@core/models/project.model';
import {ProjectService} from '../../@core/services/project.service';
import {ResponseProjectDTO} from '../../@core/models/response-project-dto.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DialogConfirmationComponent} from '../../modals/dialog-confirmation/dialog-confirmation.component';
import {ProjectManagementConfirmComponent} from "./project-management-confirm/project-management-confirm.component";

@Component({
  selector: 'projectmanagement',
  templateUrl: './projectmanagement.component.html',
  styleUrls: ['./projectmanagement.component.scss'],
})
export class ProjectmanagementComponent implements OnInit {
  isAdding: boolean = false;
  isEditing: boolean = false;
  projects: Project[];
  newProject: Project;
  projectToEdit: Project;
  statusCode: number;
  projectIdEdit: number;
  editedProjectName: string;
  msg: string;
  buttonTitle: string;
  actionType: string;
  currentProject: Project;

  constructor(private projectService: ProjectService,
              private bsModal: NgbModal) {
    this.newProject = new Project();
  }

  ngOnInit() {
    this.getListProject();
  }

  active(project: Project, content) {
    if (this.isAdding === false && this.isEditing === false) {
      this.actionType = 'EDIT';
      this.msg = 'Bạn có muốn kích hoạt dự án ' + project.name + ' không';
      this.buttonTitle = 'Lưu thay đổi'
      this.currentProject = Object.assign({}, project);
      this.currentProject.active = 1;
      this.bsModal.open(content, {backdrop: 'static', centered: true});
    }
  }

  deactive(project: Project, content) {
    if (this.isAdding === false && this.isEditing === false) {
      this.actionType = 'EDIT';
      this.msg = 'Bạn có muốn dừng hoạt động của dự án ' + project.name + ' không?';
      this.buttonTitle = 'Lưu thay đổi'
      this.currentProject = Object.assign({}, project);
      this.currentProject.active = 0;
      this.bsModal.open(content, {backdrop: 'static', centered: true});
    }
  }

  addProject() {
      this.bsModal.open(ProjectManagementConfirmComponent, {backdrop: 'static', centered: true})
  }

  cancelAddProject() {
    this.isAdding = false;
  }

  confirmAdd(event) {
    const code = (event.keyCode ? event.keyCode : event.which);
    if (event.keyCode === 13) {
      this.projectService.addNewProject(this.newProject).subscribe((response: ResponseProjectDTO) => {
        if (response.status_code === 200) {
          this.getListProject();
          this.newProject = new Project();
          this.isAdding = false;
        } else if (response.status_code === 932) {
          let dialog = this.bsModal.open(DialogConfirmationComponent, {backdrop: 'static', centered: true});
          dialog.componentInstance.msg = 'Dự án này đã tồn tại!';
          dialog.componentInstance.buttonTitle = 'Xác nhận';
        }
      });
    }
  }

  getListProject() {
    this.projectService.getAllProject().subscribe((response: ResponseProjectDTO) => {
      this.projects = response.data;
      this.sortProjectArrayByActive();
    });
  }

  showEditBox(project: Project) {
    if (this.isAdding === false) {
      this.isEditing = true;
      this.projectToEdit = project;
      this.projectIdEdit = project.id;
      this.editedProjectName = project.name;
    }
  }

  updateProjectName(project: Project, editName: string, content) {
    if (this.isAdding === false) {
      this.actionType = 'EDIT';
      this.msg = 'Bạn có muốn đổi tên ' + project.name + ' thành ' + editName + ' không?';
      this.buttonTitle = 'Lưu thay đổi'
      this.currentProject = Object.assign({}, project);
      this.currentProject.name = editName
      this.bsModal.open(content, {backdrop: 'static', centered: true});
    }
  }

  deleteProject(project: Project, content) {
    if (this.isAdding === false && this.isEditing === false) {
      this.actionType = 'DELETE';
      this.msg = 'Bạn có chắc muốn xóa ' + project.name + '?';
      this.buttonTitle = 'Xóa'
      this.currentProject = Object.assign({}, project);
      this.bsModal.open(content, {backdrop: 'static', centered: true});
    }
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
            this.isEditing = false;
            this.currentProject = null;
            this.actionType = null;
            this.getListProject();
          } else if (response.status_code === 901) {
            let dialog = this.bsModal.open(DialogConfirmationComponent, {backdrop: 'static', centered: true});
            dialog.componentInstance.msg = 'Dự án này đã tồn tại!';
            dialog.componentInstance.buttonTitle = 'Xác nhận';
          }
        });
      }
    } else {
      this.projectIdEdit = 0;
      this.isAdding = false;
      this.isEditing = false;
    }
  }

  sortProjectArrayByActive() {
    this.projects.sort((a, b) => {
      return b.active - a.active || +new Date(b.createdDate) - +new Date(a.createdDate);
    });
  }
}

