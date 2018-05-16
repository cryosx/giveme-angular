import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) { }
  // submitInquiry(data) {
  //   return this.http.post('http://localhost:3000', data);
  // }
  login(data) {
    // return this.http.get('http://localhost:3000/api/task');
    console.log('login', data);
    return this.http.post('/api/login', data);

  }
}
