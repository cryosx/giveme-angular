import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskSerivce } from '../../../services/task.service';
import { UserSerivce } from '../../../services/user.service';

import * as moment from 'moment';

import {} from '../../services/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() taskData: Object;
  @Output() renderUserTasks: EventEmitter<any>;
  @Output() toggleTaskModal: EventEmitter<any>;
  @Output() renderTasks: EventEmitter<any>;
  isParticipating: boolean;

  constructor(
    private taskService: TaskSerivce,
    private userService: UserSerivce
  ) {
    this.taskData = {
      title: '',
      description: '',
      location: {},
      reward: 0,
      expires_at: null
    };
    this.renderUserTasks = new EventEmitter<any>();
    this.toggleTaskModal = new EventEmitter<any>();
    this.renderTasks = new EventEmitter<any>();
    this.isParticipating = false;
  }

  checkIsParticipating() {
    const user_id = this.userService.getUser().id;
    this.taskService
      .getTask(this.taskData['id'])
      .toPromise()
      .then(task => {
        return (this.isParticipating = task['participants'].some(function(
          user
        ) {
          return user.id === user_id;
        }));
      })
      .catch(err => {
        this.isParticipating = false;
      });
    return this.isParticipating;
  }

  isOwner() {
    // this.checkIsParticipating();
    return this.userService.getUser().id === this.taskData['owner_id'];
  }

  acceptTask() {
    const task_id = this.taskData['id'];
    this.taskService
      .acceptTask(task_id)
      .toPromise()
      .then(task => {
        console.log(task);
        this.renderUserTasks.emit('test');
        this.renderTasks.emit();
        this.toggleTaskModal.emit();
      })
      .catch(err => {
        console.log(err);
      });
  }

  markComplete() {
    const task_id = this.taskData['id'];

    this.taskService
      .markTaskForCompletion(task_id)
      .toPromise()
      .then()
      .catch();
  }

  confirmComplete() {
    const task_id = this.taskData['id'];

    this.taskService
      .confirmTaskForCompletion(task_id)
      .toPromise()
      .then()
      .catch();
  }
}
