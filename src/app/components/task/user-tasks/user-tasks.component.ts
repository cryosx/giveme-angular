import { Component, OnInit } from '@angular/core';
import { TaskSerivce } from '../../../services/task.service';
import { UserSerivce } from '../../../services/user.service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit {
  cookieUser: Object;
  sessionUser: Object;
  userTasks: any;
  userActiveTasks: any;

  constructor(
    private taskService: TaskSerivce,
    private userService: UserSerivce
  ) {
    this.cookieUser = {};
    this.sessionUser = {};

    this.userTasks = [];
    this.userActiveTasks = [];
  }

  ngOnInit() {
    this.getUserTasks();
  }

  getUserTasks() {
    this.cookieUser = this.userService.getUser();
    const id = this.cookieUser['id'];
    this.taskService
      .getUserTasks(id)
      .toPromise()
      .then(user => {
        this.sessionUser = user;
        this.userTasks = user['myTasks'];
        this.userActiveTasks = user['activeTasks'];
        console.log(this.userTasks);
        console.log(this.userActiveTasks);
      })
      .catch();
  }
}
