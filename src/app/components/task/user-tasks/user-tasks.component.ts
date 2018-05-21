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
  moveTasksBarBtn: boolean;

  constructor(
    private taskService: TaskSerivce,
    private userService: UserSerivce,
    private gmap: GoogleMapService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.cookieUser = {};
    this.sessionUser = {};
    this.showTasksBar = false;
    this.moveTasksBarBtn = false;

    this.tasks = { myTasks: [], activeTasks: [] };
  }

  ngOnInit() {
    this.getUserTasks();
  }

  getUserTasks() {
    console.log(`I'm running`);
    this.cookieUser = this.userService.getUser();
    console.log(this.cookieUser);

    if (this.cookieUser) {
      const id = this.cookieUser['id'];
      console.log(id);
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
        this.getUserTasks();
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleTasksBar() {
    this.showTasksBar = !this.showTasksBar;
  }

  shiftTasksBarBtn() {
    this.moveTasksBarBtn = !this.moveTasksBarBtn;
  }

  goToTask(event) {
    const { taskId, taskLat, taskLng } = event.target.dataset;
    this.gmap.getMap().panTo(new google.maps.LatLng(taskLat, taskLng));
  }
}
