import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { RegisterService } from '../../services/register.service';


@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData: Object;

  constructor(private registerService: RegisterService) {
    this.registerData = {
      username: '',
      email: '',
      password: ''
    };
  }

  register(event) {
    console.log(event);
    console.log(this.registerData);
    this.registerService.register(this.registerData)
      .toPromise()
      .then(data => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch(err => {
        console.log(err);
      });
  }

}
