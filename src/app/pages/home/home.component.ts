import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import {
  trigger,
  state,
  transition,
  animate,
  style
} from '@angular/animations';
import * as moment from 'moment';

import { GoogleMapService } from '../../services/google-map.service';
import { TaskSerivce } from '../../services/task.service';
import { UserSerivce } from '../../services/user.service';

import {} from '@types/googlemaps';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
  location: Object;
  tasks: Object;
  taskData: Object;

  showTaskModal: boolean;
  showNewTaskModal: boolean;

  constructor(
    private googleMapService: GoogleMapService,
    private taskService: TaskSerivce,
    private userService: UserSerivce,
    private changeDetect: ChangeDetectorRef
  ) {
    this.tasks = {};
    this.location = { lat: 0, lng: 0 };
    this.taskData = {};
    this.showTaskModal = false;
    this.showNewTaskModal = false;
  }

  ngOnInit() {
    this.googleMapService.setMapElement(this.gmapElement);

    this.map = this.googleMapService.getMap();

    this.getTasks();

    this.map.addListener('click', event => {
      const { latLng } = event;
      this.location = { lat: latLng.lat(), lng: latLng.lng() };
      this.toggleNewTaskModal();
    });
  }

  getShowTaskModal() {
    return this.showTaskModal;
  }

  toggleTaskModal() {
    this.showTaskModal = !this.showTaskModal;
    return this.changeDetect.detectChanges();
  }

  getShowNewTaskModal() {
    return this.showNewTaskModal;
  }

  toggleNewTaskModal() {
    this.showNewTaskModal = !this.showNewTaskModal;
    return this.changeDetect.detectChanges();
  }

  getTasks() {
    this.taskService
      .getTasks()
      .toPromise()
      .then(tasks => {
        this.clearMap(Object.values(this.tasks));
        Object.values(tasks).forEach(task => {
          const { lat, lng } = task.location;
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            draggable: false,
            animation: google.maps.Animation.DROP
          });
          marker['task_id'] = task['id'];
          marker.addListener('click', () => {
            this.taskService
              .getTask(marker['task_id'])
              .toPromise()
              .then(task => {
                this.taskData = task;
                this.taskData['expires_at'] = moment(
                  this.taskData['expires_at']
                ).format('YYYY-MM-DD');

                this.toggleTaskModal();
              })
              .catch(err => {
                console.log(err);
              });
          });

          this.tasks[task['id']] = task;
          this.tasks[task['id']]['marker'] = marker;
          marker.setMap(this.map);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  clearMap(tasks) {
    tasks.forEach(task => {
      task['marker'].setMap(null);
    });
  }
}
