import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../../@core/models/project.model';
import {ProjectService} from '../../../@core/services/project.service';
import {ResponseProjectDTO} from '../../../@core/models/response-project-dto.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../@core/models/user.model';
import {ResponseUserDTO} from '../../../@core/models/responseUserDTO.model';
import {UserService} from '../../../@core/services/user.service';
import {Observable} from 'rxjs/index';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ProjectUser} from '../../../@core/models/ProjectUser';
import {MessageConstant} from '../../../@core/glossary/message.constant';

@Component({
  selector: 'project-management-confirm',
  templateUrl: './project-management-confirm.component.html',
  styleUrls: ['./project-management-confirm.component.scss']
})
export class ProjectManagementConfirmComponent implements OnInit {
  project: Project;
  isDuplicateName;
  isValidate: boolean = true;
  @Input() dismiss;
  @Input() projectEdit;
  @Output()
  @Output() projectOutPut = new EventEmitter();
  userCtrl = new FormControl();
  addEvent = new EventEmitter<String>();
  listUser: Array<User>;

  typeAction: string = 'add';

  listUserSelect: Array<User> = [];

  filteredUsers: Observable<Array<User>>;
  addOnBlur = false;

  separatorKeysCodes: Array<number> = [ENTER, COMMA];

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private projectService: ProjectService,
              private bsModal: NgbModal) {
  }

  ngOnInit() {
    this.project = new Project();
    // check is edit
    if (this.projectEdit) {
      this.project = Object.assign({}, this.projectEdit);
      this.typeAction = 'edit';
    }
    this.userService.getUsers().subscribe((response: ResponseUserDTO) => {
      if (response.status_code === 200) {
        this.listUser = response.data;
        this.userCtrl = new FormControl();
        if (this.typeAction === 'edit') {
          this.project.projectUserList.forEach(value => {
            const indexUserInList = this.listUser.map(value1 => value1.username).indexOf(value.projectUser.username);
            if (indexUserInList >= 0) {
              this.listUserSelect.push(Object.assign(this.listUser[indexUserInList]));
              this.listUser.splice(indexUserInList, 1);
            }
          })
        }
        this.filteredUsers = this.setFilteredUsers(this.listUser);
      }
    });
  }

  closeModal() {
    this.dismiss();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.listUserSelect.push(event.option.value);
    let users: Array<User> = [];
    this.filteredUsers.subscribe(value => users = value.filter(value1 => value1.username !== event.option.value.username));

    this.filteredUsers = this.setFilteredUsers(users);

  }

  removeItemSelect(i): void {
    let users: Array<User> = [];
    this.filteredUsers.subscribe(value => users = value.filter(value1 => value1));
    users.push(Object.assign(this.listUserSelect[i]));
    this.filteredUsers = this.setFilteredUsers(users);
    this.listUserSelect.splice(i, 1);

  }

  setFilteredUsers(users: Array<User>) {
    this.userCtrl = new FormControl();
    let usersObservable: Observable<Array<User>>;
    usersObservable = this.userCtrl.valueChanges
      .startWith(null)
      .map(user => user && typeof user === 'object' ? user.fullName : user)
      .map(user => user ? users.filter(user1 => user1.fullName.toLowerCase().indexOf(user.toLowerCase()) === 0)
        : users);
    return usersObservable;
  }

  confirmAdd() {
    if (this.project.name == null || this.project.name === undefined || this.project.name === '') {
      this.isValidate = false;
      this.isDuplicateName = false;
    } else {
      const projectUsers: Array<ProjectUser> = [];
      this.listUserSelect.forEach(value => {
        const projectUser: ProjectUser = new ProjectUser();
        projectUser.projectUser = value;
        projectUsers.push(projectUser);
      });
      this.project.projectUserList = projectUsers;
      this.projectService.addNewProject(this.project).subscribe((response: ResponseProjectDTO) => {
        if (response.status_code === 200) {
          this.projectOutPut.emit(response.data);
          swal('Chúc Mừng!', MessageConstant.MSG_SUCCESS.CREATE_SUCCESS, 'success');
          this.dismiss();
        } else if (response.status_code === 932) {
          this.isDuplicateName = true;
          this.isValidate = true;
        }
      }, error1 => {
        swal('Xin lỗi', MessageConstant.MSG_ERROR.SYSTEM_ERROR.toString(), 'error')
      });
    }
  }

  updateProject() {
    if (this.project.name == null || this.project.name === undefined || this.project.name === '') {
      this.isValidate = false;
      this.isDuplicateName = false;
    } else {
      const projectUsers: Array<ProjectUser> = [];
      this.listUserSelect.forEach(value => {
        const projectUser: ProjectUser = new ProjectUser();
        projectUser.projectUser = value;
        projectUsers.push(projectUser);
      });
      this.project.projectUserList = projectUsers;
      this.projectService.updateProject(this.project).subscribe((response: ResponseProjectDTO) => {
        if (response.status_code === 200) {
          this.projectOutPut.emit(response.data);
          swal('Chúc Mừng!', MessageConstant.MSG_SUCCESS.UPDATE_SUCCESS, 'success');
          this.dismiss();
        } else if (response.status_code === 901) {
          if (response.message === 'parameters name project exist') {
            this.isDuplicateName = true;
            this.isValidate = true;
          }
        }
      }, error1 => {
        swal('Xin lỗi', MessageConstant.MSG_ERROR.SYSTEM_ERROR.toString(), 'error')
      });
    }
  }
}
