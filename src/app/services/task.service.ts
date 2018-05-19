import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskSerivce {
  constructor(private http: HttpClient) {}

  getUserTasks(id) {
    return this.http.get(`/api/user/${id}`);
  }

  getTask(id) {
    return this.http.get(`/api/task/${id}`);
  }

  getTasks() {
    // return this.http.get('http://localhost:3000/api/task');
    return this.http.get('/api/task');
  }
  addTask(taskData) {
    return this.http.post('/api/task/new', taskData);
  }
  acceptTask(id) {
    // console.log(id);
    return this.http.get(`/api/task/${id}/accept`);
  }
  leaveTask(id) {
    return this.http.get(`/api/task/${id}/leave`);
  }

  //   leaveTask2(id) {
  //     return this.http.get(`/api/${user_id}/task/${id}/leave`);
  //   }
}
