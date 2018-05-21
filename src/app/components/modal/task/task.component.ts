import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { TaskSerivce } from '../../../services/task.service';
import { UserSerivce } from '../../../services/user.service';

import * as moment from 'moment';

import {} from '../../services/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() taskData: Object;
  @Output() renderUserTasks: EventEmitter<any>;
  @Output() toggleTaskModal: EventEmitter<any>;
  @Output() renderTasks: EventEmitter<any>;
  isParticipating: boolean;

  constructor(
    private taskService: TaskSerivce,
    private userService: UserSerivce,
    private changeDetector: ChangeDetectorRef
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

  ngOnInit() {
    // const dateInput = document.getElementById('new_task_expires');
    // const now = moment().format('YYYY-MM-DD');
    // const tomorrow = moment()
    //   .add(1, 'day')
    //   .format('YYYY-MM-DD');
    // dateInput.setAttribute('min', now);
    // this.taskData['expires_at'] = tomorrow;
    // dateInput.setAttribute('value', tomorrow);
  }

  checkIsParticipating() {
    const user_id = this.userService.getUser().id;
    this.taskService
      .getTask(this.taskData['id'])
      .toPromise()
      .then(task => {
        this.isParticipating = task['participants'].some(function(user) {
          return user.id === user_id;
        });
      })
      .catch(err => {
        this.isParticipating = false;
        // return this.changeDetector.detectChanges();
      });
  }

  isOwner() {
    this.checkIsParticipating();
    return this.userService.getUser().id === this.taskData['owner_id'];
  }

  acceptTask() {
    this.taskService
      .acceptTask(this.taskData['id'])
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
}
