import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenService} from '../../@core/services/authen.service';
import {User} from '../../@core/models/user.model';
import {MessageConstant} from '../../@core/glossary/message.constant';
import {UserService} from '../../@core/services/user.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: User;
  loginForm: FormGroup;
  submitted = false;
  invalidLogin: boolean = false;
  message: String;
  userName: string;
  password: string;
  alert: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenService: AuthenService,
              private userService: UserService,
              private cookieService: CookieService,
              private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false],
    });
    this.userService.currentUser.subscribe(user => this.user = user);
  }

  onSubmit() {

    this.message = null;
    this.submitted = true;
    if (this.loginForm.controls.userName.value === ''
    || this.loginForm.controls.password.value === '') {
      this.message = MessageConstant.blankLogin.toString();
    }
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.controls.userName.value !== '') {
      const user: User = new User();
      user.username = this.loginForm.controls.userName.value;
      user.password = this.loginForm.controls.password.value;
      user.remember = this.loginForm.controls.remember.value;
      this.authenService.attemptAuth(user).subscribe(
        res => {
          this.userService.getUserInfoHttp(res.body.username);
          this.cookieService.set('username', res.body.username);
          this.activeModal.close();
        },
        (error) => {
          this.message = MessageConstant.loginFalse.toString();
          return false;
        },
      )

    } else {
      this.invalidLogin = true;
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
