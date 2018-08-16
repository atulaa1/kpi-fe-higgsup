import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenService} from '../../@core/services/authen.service';
import {User} from '../../@core/models/user.model';
import {MessageConstant} from '../../@core/glossary/message.constant';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  invalidLogin: boolean = false;
  message: String;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenService: AuthenService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false],
    })
  }

  onSubmit() {

    this.message = null;
    this.submitted = true;
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
          this.router.navigateByUrl('/');
          // window.location.reload();
          console.log('lol ' + res);
          // get token and username in cookies

          // call getUserInfo API
          // binding data of user in menu
          return true;
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
}
