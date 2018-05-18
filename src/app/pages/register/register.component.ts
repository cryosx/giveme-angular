import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserSerivce } from '../../services/user.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData: Object;

  constructor(private user: UserSerivce, private router: Router) {
    this.registerData = {
      username: '',
      email: '',
      password: ''
    };
  }

  register(event) {
    console.log(event);
    console.log(this.registerData);
    this.user.register(this.registerData);
    return this.router.navigateByUrl('/');
  }
}
