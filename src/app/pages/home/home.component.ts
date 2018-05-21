import {
  Component,
  ViewChild,
  OnInit,
  ApplicationRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import {
  trigger,
  state,
  transition,
  animate,
  style
} from '@angular/animations';
import * as moment from 'moment';

import { UserTasksComponent } from '../../components/task/user-tasks/user-tasks.component';
import { TaskComponent } from '../../components/modal/task/task.component';

import { GoogleMapService } from '../../services/google-map.service';
import { UserSerivce } from '../../services/user.service';
import { TaskSerivce } from '../../services/task.service';

import {} from '@types/googlemaps';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  @ViewChild(UserTasksComponent) private userTasksComponent: UserTasksComponent;
  @ViewChild(TaskComponent) private taskComponent: TaskComponent;

  map: google.maps.Map;
  location: Object;
  tasks: Object;
  taskData: Object;

  test: EventEmitter<any>;
  showTaskModal: boolean;
  showNewTaskModal: boolean;
  showTasksBar: boolean;

  constructor(
    private userService: UserSerivce,
    private googleMapService: GoogleMapService,
    private taskService: TaskSerivce,
    private cdRef: ChangeDetectorRef,
    private appRef: ApplicationRef
  ) {
    this.tasks = {};
    this.location = { lat: 0, lng: 0 };
    this.taskData = {};
    this.showTaskModal = false;
    this.showNewTaskModal = false;
    this.showTasksBar = false;
    this.test = new EventEmitter<any>();
  }

  ngOnInit() {
    this.googleMapService.setMapElement(this.gmapElement);

    this.map = this.googleMapService.getMap();

    this.populateMap();

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
    return this.cdRef.detectChanges();
  }

  getShowNewTaskModal() {
    return this.showNewTaskModal;
  }

  toggleNewTaskModal() {
    this.showNewTaskModal = !this.showNewTaskModal;
    return this.cdRef.detectChanges();
  }

  populateMap() {
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
                this.test.emit();
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

  getTasks() {
    return this.tasks;
  }
  renderUserTasks(event) {
    this.userTasksComponent.getUserTasks();
  }
  toggleTasksBar(event) {
    this.userTasksComponent.toggleTasksBar();
    this.userTasksComponent.shiftTasksBarBtn();
  }
  runTest() {
    console.log('test');
  }
}
