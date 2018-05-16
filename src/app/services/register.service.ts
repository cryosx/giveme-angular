import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  constructor(private http: HttpClient) { }
  // submitInquiry(data) {
  //   return this.http.post('http://localhost:3000', data);
  // }
  register(data) {
    // return this.http.get('http://localhost:3000/api/task');
    console.log('register', data);
    return this.http.post('/api/register', data);

  }
}
