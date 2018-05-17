import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TaskSerivce } from '../../services/task.service';

import * as moment from 'moment';

import {} from '../../services/task.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  taskData: Object;
  @Input() location: Object;
  @Output() addNewTask: EventEmitter<any>;
  @Output() toggleModal: EventEmitter<any>;
  @Output() renderTasks: EventEmitter<any>;

  constructor(private taskService: TaskSerivce) {
    this.location = {};
    this.taskData = {
      title: '',
      description: '',
      reward: 0,
      expires_at: null
    };
    this.addNewTask = new EventEmitter<any>();
    this.toggleModal = new EventEmitter<any>();
    this.renderTasks = new EventEmitter<any>();
  }

  ngOnInit() {
    const dateInput = document.getElementById('new_task_expires');
    const now = moment().format('YYYY-MM-DD');
    const tomorrow = moment()
      .add(1, 'day')
      .format('YYYY-MM-DD');
    dateInput.setAttribute('min', now);
    this.taskData['expires_at'] = tomorrow;
    // dateInput.setAttribute('value', tomorrow);
  }

  addTask(event) {
    this.taskData['location'] = this.location;
    this.taskService
      .addTask(this.taskData)
      .toPromise()
      .then(task => {
        console.log(task);
        // this.addNewTask.emit(task);
        this.toggleModal.emit();
        this.renderTasks.emit();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
