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

  userCtrl = new FormControl();
  addEvent = new EventEmitter<String>();
  listUser: Array<User>;


  listUserSelect: Array<User> = [];

  filteredUsers: Observable<Array<User>>;
  addOnBlur = false;

  separatorKeysCodes: Array<number> = [ENTER, COMMA];

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private projectService: ProjectService) {
  }

  ngOnInit() {
    this.newProject = new Project();
    this.userService.getUsers().subscribe((response: ResponseUserDTO) => {
      if (response.status_code === 200) {
        this.listUser = response.data;
        this.userCtrl = new FormControl();
        this.filteredUsers = this.userCtrl.valueChanges
          .startWith(null)
          .map(user => user && typeof user === 'object' ? user.fullName : user)
          .map(user => user ? this.listUser.filter(user1 => user1.fullName.toLowerCase().indexOf(user.toLowerCase()) === 0)
            : this.listUser);
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
    if (this.newProject.name == null || this.newProject.name === undefined || this.newProject.name === '') {
      this.isValidate = false;
      this.isDuplicateName = false;
    } else {
      const projectUsers: Array<ProjectUser> = [];
      this.listUserSelect.forEach(value => {
        const projectUser: ProjectUser = new ProjectUser();
        projectUser.projectUser = value;
        projectUsers.push(projectUser);
      });
      this.newProject.projectUserList = projectUsers;
      this.projectService.addNewProject(this.newProject).subscribe((response: ResponseProjectDTO) => {
        if (response.status_code === 200) {
          this.newProject = new Project();
          this.addEvent.emit('add project');
          swal('Chúc Mừng!', 'Đã tạo thành công!', 'success');
          this.dismiss();
          this.isDuplicateName = false;
        } else if (response.status_code === 932) {
          this.isDuplicateName = true;
          this.isValidate = true;
        }
      });
    }
  }
}
