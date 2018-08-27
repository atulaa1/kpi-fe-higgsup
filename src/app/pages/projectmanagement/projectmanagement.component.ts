import {Component, OnInit} from '@angular/core';
import {Project} from '../../@core/models/project.model';
import {ProjectService} from '../../@core/services/project.service';
import {ResponseProjectDTO} from '../../@core/models/response-project-dto.model';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DialogEditConfirmationComponent} from '../../modals/dialog-edit-confirmation/dialog-edit-confirmation.component';
import {MatDialog} from "@angular/material";

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
  projectToEdit: Project;
  statusCode: number;
  projectIdEdit: number;
  editedProjectName: string;
  confirmModal: NgbModalRef;

  constructor(private projectService: ProjectService,
              private bsModal: NgbModal,
              private dialog: MatDialog) {
    this.newProject = new Project();
  }

  ngOnInit() {
    this.getListProject();
  }

  Active(project: Project) {
    project.active = 1;
    this.projectService.updateProject(project).subscribe((response: ResponseProjectDTO) => {
      if (response.status_code === 200) {
        this.getListProject();
      }
    });
  }

  Deactive(project: Project) {
    project.active = 0;
    this.projectService.updateProject(project).subscribe((response: ResponseProjectDTO) => {
      if (response.status_code === 200) {
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
    });
  }

  showEditBox(project: Project) {
    this.projectToEdit = project;
    this.projectIdEdit = project.id;
    this.editedProjectName = project.name;
  }

  updateProjectName(project: Project, editName: string) {
    const confirm = window.confirm('Bạn đã đổi tên ' + project.name + ' thành ' + editName);
    if (confirm === true) {
      project.name = editName;
      this.projectService.updateProject(project).subscribe((response: ResponseProjectDTO) => {
        if (response.status_code === 200) {
          this.projectIdEdit = 0;
          this.getListProject();
        }
      });
    }
  }

  deleteProject(project: Project) {
    this.openConfirmModal();
    const confirmValue = confirm('Bạn có chắc muốn xóa ' + project.name + '?');
    if (confirmValue === true) {
      this.projectService.deleteProject(project).subscribe((response: ResponseProjectDTO) => {
        if (response.status_code === 200) {
          this.getListProject();
        }
      });
    }
  }

  openConfirmModal() {
    const dialogRef = this.dialog.open(DialogEditConfirmationComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }
}
