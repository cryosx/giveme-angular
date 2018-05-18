import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSerivce } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isLoggedIn;

  constructor(private user: UserSerivce, private router: Router) {
    this.isLoggedIn = user.getIsLoggedIn;
  }
  logout() {
    this.user.logout();
    this.router.navigateByUrl('/');
  }
}
