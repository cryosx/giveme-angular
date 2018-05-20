import { Injectable } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserSerivce implements CanActivate {
  isLoggedIn: boolean;
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) {
    this.isLoggedIn = localStorage.getItem('user') ? true : false;
  }

  register(data) {
    return this.authService
      .register(data)
      .toPromise()
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return (this.isLoggedIn = true);
      })
      .catch(err => {
        console.log(err);
        return (this.isLoggedIn = false);
      });
  }

  login(data) {
    return this.authService
      .login(data)
      .toPromise()
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return (this.isLoggedIn = true);
      })
      .catch(err => {
        console.log(err);
        return (this.isLoggedIn = false);
      });
  }

  logout() {
    return this.authService
      .logout()
      .toPromise()
      .then(data => {
        localStorage.removeItem('user');
        return (this.isLoggedIn = false);
      })
      .catch(err => {
        console.log(err);
        return (this.isLoggedIn = false);
      });
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getIsLoggedIn = () => {
    return this.isLoggedIn;
  };

  canActivate() {
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/');
    }
    return !this.getIsLoggedIn();
  }
}
