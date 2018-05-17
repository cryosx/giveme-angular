import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  constructor(private http: HttpClient) { }
  // submitInquiry(data) {
  //   return this.http.post('http://localhost:3000', data);
  // }

}
