import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSerivce } from '../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn;

  constructor(private user: UserSerivce, private router: Router) {
    this.isLoggedIn = user.getIsLoggedIn;
  }
  logout() {
    this.user.logout();
    this.router.navigateByUrl('/');
  }

}
