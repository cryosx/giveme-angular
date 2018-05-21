import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';

import * as _moment from 'moment';

import { TaskSerivce } from '../../../services/task.service';
import { Task } from '../../../models/Task';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD'
  },
  display: {
    dateInput: 'YYYY-MM-DD'
  }
};

@Component({
  selector: 'app-newtask-modal',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class NewTaskComponent implements OnInit {
  date = new FormControl(moment());

  taskData: Object;
  @Input() location: Object;
  @Output() addNewTask: EventEmitter<any>;
  @Output() toggleNewTaskModal: EventEmitter<any>;
  @Output() renderTasks: EventEmitter<any>;

  constructor(
    private taskService: TaskSerivce,
    private cdRef: ChangeDetectorRef
  ) {
    this.location = {};
    // this.taskData = new Task('', '', {}, 0, '');
    this.taskData = {
      title: '',
      description: '',
      reward: 0,
      location: this.location,
      expires_at: null
    };

    this.addNewTask = new EventEmitter<any>();
    this.toggleNewTaskModal = new EventEmitter<any>();
    this.renderTasks = new EventEmitter<any>();
  }

  ngOnInit() {
    const dateInput = document.getElementById('new_task_expires');
    const now = moment().format('YYYY-MM-DD');
    const tomorrow = moment()
      .add(1, 'day')
      .format('YYYY-MM-DD');
    // dateInput.setAttribute('min', now);
    dateInput.setAttribute('value', tomorrow);
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
        this.renderTasks.emit();
        this.toggleNewTaskModal.emit();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
