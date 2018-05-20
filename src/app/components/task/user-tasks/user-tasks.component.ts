import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { TaskSerivce } from '../../../services/task.service';
import { UserSerivce } from '../../../services/user.service';
import { GoogleMapService } from '../../../services/google-map.service';

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
  showTasksBar: boolean;

  constructor(
    private taskService: TaskSerivce,
    private userService: UserSerivce,
    private gmap: GoogleMapService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.cookieUser = {};
    this.sessionUser = {};
    this.showTasksBar = false;

    this.tasks = { myTasks: [], activeTasks: [] };
  }

  ngOnInit() {
    this.getUserTasks();
  }

  getUserTasks() {
    console.log(`I'm running`);
    this.cookieUser = this.userService.getUser();
    // console.log(this.cookieUser.user);
    if (this.cookieUser) {
      const id = this.cookieUser['id'];
      console.log(this.cookieUser);
      this.taskService
        .getUserTasks(id)
        .toPromise()
        .then(user => {
          this.sessionUser = user;

          this.tasks['myTasks'] = this.sessionUser['myTasks'].sort(function(
            task1,
            task2
          ) {
            return moment(task1.expires_at).diff(moment(task2.expires_at));
          });
          this.tasks['activeTasks'] = this.sessionUser['activeTasks'].sort(
            function(task1, task2) {
              return moment(task1.expires_at).diff(moment(task2.expires_at));
            }
          );
          this.changeDetector.detectChanges();
          console.log(this.tasks);
        })
        .catch();
    }
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

  toggleTasksBar() {
    console.log('toggle test');
    this.showTasksBar = !this.showTasksBar;
  }

  goToTask() {
    console.log('test');
    this.gmap.getMap().panTo({ lat: 0, lng: 0 });
  }
}
