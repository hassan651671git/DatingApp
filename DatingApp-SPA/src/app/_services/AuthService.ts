import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  baseUrl: string = 'http://localhost:5000/auth/';
  constructor(private httpClient: HttpClient) {}

  Login(loginData: any): Observable<object> {
    console.log('login method called from service');
    return this.httpClient.post(this.baseUrl + 'login', loginData).pipe( );
  }
  Register(registerData: any): Observable<object> {
     
    return this.httpClient.post(this.baseUrl + 'register', registerData).pipe( );
  }
}
