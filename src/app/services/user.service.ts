import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserSerivce {
  isLoggedIn: boolean;
  user: Object;
  constructor() {
    this.user = localStorage.getItem('user');
    this.isLoggedIn = this.user ? true : false;
  }

  logout() {
    return this.isLoggedIn = false;
  }

  getUser() {
    return this.user;
  }
  getIsLoggedIn() {
    return this.isLoggedIn;
  }
}
