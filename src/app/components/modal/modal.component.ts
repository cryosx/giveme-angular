import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  taskData: Object;
  constructor() {
    this.taskData = {
      title: '',
      description: '',
      reward: 0,
      location: {},
      expires_at: null
    };
  }

  addTask(event) {
    console.log(event);
  }

}
