import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskSerivce {
  constructor(private http: HttpClient) {}

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
}
