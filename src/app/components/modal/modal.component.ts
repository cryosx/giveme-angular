import { Component, Input, OnInit } from '@angular/core';
import { TaskSerivce } from '../../services/task.service';

import * as moment from 'moment';

import { } from '../../services/task.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  taskData: Object;
  @Input() location: Object;
  constructor(private taskService: TaskSerivce) {
    this.location = {};
    this.taskData = {
      title: '',
      description: '',
      reward: 0,
      expires_at: null
    };
  }

  ngOnInit() {
    const dateInput = document.getElementById('new_task_expires');
    const now = moment().format('YYYY-MM-DD');
    const tomorrow = moment().add(1, 'day').format('YYYY-MM-DD');
    dateInput.setAttribute('min', now);
    this.taskData['expires_at'] = tomorrow;
    // dateInput.setAttribute('value', tomorrow);

  }

  addTask(event) {
    this.taskData['location'] = this.location;
    console.log(this.taskData);
    console.log(event);
    this.taskService.addTask(this.taskData)
      .toPromise()
      .then(task => {
        console.log(task);
      })
      .catch(err => {
        console.log(err);
      });
  }

}
