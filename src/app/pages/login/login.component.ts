import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticateService } from '../../services/authenticate.service';
import { UserSerivce } from '../../services/user.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: Object;

  constructor(private user: UserSerivce, private router: Router) {
    this.loginData = {
      email: '',
      password: ''
    };
  }

  login(event) {
    console.log(event);
    console.log(this.loginData);
    this.user.login(this.loginData);
    // this.user.getIsLoggedIn();
    return this.router.navigateByUrl('/');

  }
}

