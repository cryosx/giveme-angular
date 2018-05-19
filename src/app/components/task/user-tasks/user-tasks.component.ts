import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { TaskSerivce } from '../../../services/task.service';
import { UserSerivce } from '../../../services/user.service';

import * as moment from 'moment';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit {
  cookieUser: Object;
  sessionUser: Object;
  tasks: Object;

  constructor(
    private taskService: TaskSerivce,
    private userService: UserSerivce,
    private changeDetector: ChangeDetectorRef
  ) {
    this.cookieUser = {};
    this.sessionUser = {};

    this.tasks = { myTasks: [], activeTasks: [] };
  }

  ngOnInit() {
    this.getUserTasks();
  }

  getUserTasks() {
    console.log('tst');
    this.cookieUser = this.userService.getUser();
    const id = this.cookieUser['id'];
    this.taskService
      .getUserTasks(id)
      .toPromise()
      .then(user => {
        this.sessionUser = user;
        this.tasks['myTasks'] = this.sessionUser['myTasks'];
        this.tasks['activeTasks'] = this.sessionUser['activeTasks'];
        this.changeDetector.detectChanges();
        console.log(this.tasks);
      })
      .catch();
  }
  getExpiration(datetime) {
    const time = moment(datetime)
      .toNow(true)
      .split(' ');
    if (time[0].toLocaleLowerCase() === 'a') {
      time[0] = '1';
    }
    return time;
  }

  leaveTask(event) {
    const { taskId } = event.target.dataset;
    this.taskService
      .leaveTask(taskId)
      .toPromise()
      .then(data => {
        console.log(data);
        this.getUserTasks();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
