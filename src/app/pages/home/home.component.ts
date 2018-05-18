import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import {
  trigger,
  state,
  transition,
  animate,
  style
} from '@angular/animations';
import * as moment from 'moment';

import { HomeService } from '../../services/home.service';
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
    private homeService: HomeService,
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
    const mapOptions = {
      center: new google.maps.LatLng(21.3086887, -157.8106461),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      // gestureHandling: 'cooperative',
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapOptions);

    this.getTasks();

    this.map.addListener('click', event => {
      const { latLng } = event;
      this.location = { lat: latLng.lat(), lng: latLng.lng() };
      this.toggleNewTaskModal();

      // this.changeDetect.detectChanges();
      // const marker = new google.maps.Marker({
      //   position: new google.maps.LatLng(latLng.lat(), latLng.lng()),
      //   draggable: true,
      //   animation: google.maps.Animation.DROP
      // });
      // marker.addListener('click', () => {
      //   console.log('marker', marker);
      // });
      // marker.setMap(this.map);

      // this.showModal = true;
    });
  }

  // addMarker(event) {
  //   const { latLng } = event;
  //   // const marker = new google.maps.Marker({
  //   //   position: new google.maps.LatLng(latLng.lat(), latLng.lng()),
  //   //   draggable: true,
  //   //   animation: google.maps.Animation.DROP,
  //   // });
  //   // console.log(this.markers);
  //   // // To add the marker to the map, call setMap();
  //   // marker.setMap(this.map);
  // }

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
  log() {
    console.log('click');
  }
}
