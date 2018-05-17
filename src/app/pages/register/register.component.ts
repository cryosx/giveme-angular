import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticateService } from '../../services/authenticate.service';


@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData: Object;

  constructor(private authService: AuthenticateService) {
    this.registerData = {
      username: '',
      email: '',
      password: ''
    };
  }

  register(event) {
    console.log(event);
    console.log(this.registerData);
    this.authService.register(this.registerData);

  }

}
