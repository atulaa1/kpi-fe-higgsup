import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../../@core/models/project.model';
import {ProjectService} from '../../../@core/services/project.service';
import {ResponseProjectDTO} from '../../../@core/models/response-project-dto.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'project-management-confirm',
  templateUrl: './project-management-confirm.component.html',
  styleUrls: ['./project-management-confirm.component.scss']
})
export class ProjectManagementConfirmComponent implements OnInit {
  newProject: Project;
  isDuplicateName;
  isValidate: boolean = true;
  @Input() dismiss;
  @Output()
  addEvent = new EventEmitter<String>();

  constructor(private modalService: NgbModal,
              private projectService: ProjectService) {
  }

  ngOnInit() {
    this.newProject = new Project();

  }

  closeModal() {
    this.dismiss();
  }

  confirmAdd() {
    if (this.newProject.name == null || this.newProject.name === undefined) {
     this.isValidate = false;
    }else {
      this.projectService.addNewProject(this.newProject).subscribe((response: ResponseProjectDTO) => {
        if (response.status_code === 200) {
          this.newProject = new Project();
          this.addEvent.emit('add project');
          swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
          this.dismiss();
          this.isDuplicateName = false;
        } else if (response.status_code === 932) {
          this.isDuplicateName = true;
        }
      });
    }
  }
}
