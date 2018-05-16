import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginService } from '../../services/login.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: Object;

  constructor(private loginService: LoginService) {
    this.loginData = {
      email: '',
      password: ''
    };
  }

  login(event) {
    console.log(event);
    console.log(this.loginData);
    this.loginService.login(this.loginData)
      .toPromise()
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

