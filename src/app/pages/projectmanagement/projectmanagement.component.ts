import {Component, OnInit} from '@angular/core';
import {Project} from '../../@core/models/project.model';
import {ProjectService} from '../../@core/services/project.service';
import {ResponseProjectDTO} from '../../@core/models/response-project-dto.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DialogConfirmationComponent} from '../../modals/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'projectmanagement',
  templateUrl: './projectmanagement.component.html',
  styleUrls: ['./projectmanagement.component.scss'],
})
export class ProjectmanagementComponent implements OnInit {
  isAdding: boolean = false;
  isEditing: boolean = false;
  projects: Project[];
  projectsClone: Project[];
  newProject: Project;
  projectToEdit: Project;
  statusCode: number;
  projectIdEdit: number;
  editedProjectName: string;
  msg: string;
  buttonTitle: string;
  actionType: string;
  currentProject: Project;
  showMsg: boolean = false;
  nameSearch: string;

  constructor(private projectService: ProjectService,
              private bsModal: NgbModal) {
    this.newProject = new Project();
  }

  ngOnInit() {
    this.getListProject();
  }

  changeStatus(project: Project, content) {
    if (this.isAdding === false && this.isEditing === false) {
      const running = 'kích hoạt';
      const stopping = 'dừng hoạt động';
      this.actionType = 'EDIT';
      if (project.active === 1) {
        this.msg = 'Bạn có muốn ' + stopping + ' của dự án ' + project.name + ' không?';
        this.buttonTitle = 'Lưu';
        this.currentProject = Object.assign({}, project);
        this.currentProject.active = 0;
        this.bsModal.open(content, {backdrop: 'static', centered: true});
      } else {
        this.msg = 'Bạn có muốn ' + running + ' dự án ' + project.name + ' không?';
        this.buttonTitle = 'Lưu';
        this.currentProject = Object.assign({}, project);
        this.currentProject.active = 1;
        this.bsModal.open(content, {backdrop: 'static', centered: true});
      }
    }
  }

  open(content) {
    this.bsModal.open(content, {backdrop: 'static', centered: true, size: 'lg'});
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
          const dialog = this.bsModal.open(DialogConfirmationComponent, {backdrop: 'static', centered: true});
          dialog.componentInstance.msg = 'Dự án này đã tồn tại!';
          dialog.componentInstance.buttonTitle = 'Xác nhận';
        }
      });
    }
  }

  getListProject() {
    this.projectService.getAllProject().subscribe((response: ResponseProjectDTO) => {
      this.projects = response.data;
      this.projectsClone = Object.assign(this.projects)
      this.sortProjectArrayByActive();
    });
  }

  showEditBox(project: Project) {
    if (this.isAdding === false && this.isEditing === false) {
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
      this.buttonTitle = 'Lưu';
      this.currentProject = Object.assign({}, project);
      this.currentProject.name = editName;
      this.bsModal.open(content, {backdrop: 'static', centered: true});
    }
  }

  deleteProject(project: Project, content) {
    if (this.isAdding === false && this.isEditing === false) {
      this.actionType = 'DELETE';
      this.msg = 'Bạn có chắc muốn xóa ' + project.name + '?';
      this.buttonTitle = 'Xóa';
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
            const dialog = this.bsModal.open(DialogConfirmationComponent, {backdrop: 'static', centered: true});
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
      if (b.active !== a.active) {
        return b.active - a.active;
      } else {
        return new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
      }
    });
  }

  onAddProject($event) {
    this.getListProject();
  }

  updateAndCreateProject($event) {
    const index = this.projects.map(value => value.id).indexOf($event.id);
    if (index === -1) {
      this.projects.push($event)
    } else {
      this.projects.splice(index, 1, $event);
    }
    this.projectsClone = Object.assign(this.projects);
    this.sortProjectArrayByActive();
  }

  handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.searchPrject();
    } else if (this.nameSearch === '') {
      this.searchPrject();
    }
  }

  searchName(projectInfo) {
    return projectInfo.name.toUpperCase().indexOf(this.nameSearch.toUpperCase()) >= 0
  }

  searchPrject() {
    this.showMsg = false;
    this.projects = Object.assign(this.projectsClone);
    this.projects = this.projects.filter(project => this.searchName(project))
    if (this.projects.length === 0) {
      this.showMsg = true;
    }
  }
}

