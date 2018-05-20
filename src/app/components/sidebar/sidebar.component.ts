import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserSerivce } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() showTasksBar: EventEmitter<any>;

  showSideBar: boolean;
  moveBtn: boolean;

  isLoggedIn;

  constructor(private user: UserSerivce, private router: Router) {
    this.showTasksBar = new EventEmitter<any>();
    this.isLoggedIn = user.getIsLoggedIn;
    this.showSideBar = false;
    this.moveBtn = false;
  }
  logout() {
    this.user.logout();
    // this.router.navigateByUrl('/');
    window.location.reload();
  }
  toggleTasksBar() {
    this.showTasksBar.emit();
  }

  toggleSideBar() {
    this.showSideBar = !this.showSideBar;
  }

  shiftBtn() {
    this.moveBtn = !this.moveBtn;
  }
}
