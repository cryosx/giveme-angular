import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TaskSerivce } from '../../../services/task.service';

import * as moment from 'moment';

import {} from '../../services/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() taskData: Object;
  @Output() acceptTaskEvent: EventEmitter<any>;
  @Output() toggleTaskModal: EventEmitter<any>;
  @Output() renderTasks: EventEmitter<any>;

  constructor(private taskService: TaskSerivce) {
    this.taskData = {
      title: '',
      description: '',
      location: {},
      reward: 0,
      expires_at: null
    };
    this.acceptTaskEvent = new EventEmitter<any>();
    this.toggleTaskModal = new EventEmitter<any>();
    this.renderTasks = new EventEmitter<any>();
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

  acceptTask() {
    this.taskService
      .acceptTask(this.taskData['id'])
      .toPromise()
      .then(task => {
        console.log(task);
        // this.acceptTaskEvent.emit(task);
        this.toggleTaskModal.emit();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
