import { Injectable } from '@angular/core';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})

export class UserSerivce {
  isLoggedIn: boolean;
  user: Object;
  constructor(private authService: AuthenticateService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.isLoggedIn = this.user ? true : false;
  }

  login(data) {
    return this.authService.login(data)
      .toPromise()
      .then(user => {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        return this.isLoggedIn = true;
      }).catch(err => {
        console.log(err);
      });
  }

  logout() {
    return this.authService.logout()
      .toPromise()
      .then(data => {
        localStorage.removeItem('user');
        return this.isLoggedIn = false;
      }).catch(err => {
        console.log(err);
      });
  }

  getUser() {
    return this.user;
  }

  getIsLoggedIn = () => {
    // console.log(this);
    return this.isLoggedIn;
  }
}
