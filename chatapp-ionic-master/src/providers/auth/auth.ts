import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable()
export class AuthProvider {
  constructor(private http: HttpClient) {}

  RegisterUser(username, email, password): Observable<any> {
    return this.http.post(`${BASEURL}/register`, {
      username,
      email,
      password
    });
  }

  LoginUser(username, password): Observable<any> {
    return this.http.post(`${BASEURL}/login`, {
      username,
      password
    });
  }
}
