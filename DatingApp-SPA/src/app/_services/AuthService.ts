import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable()
export class AuthService {
  jwtHelperService = new JwtHelperService();
  decodedToken: any;
  baseUrl: string = environment.apiBaseUrl+'auth/';
  constructor(private httpClient: HttpClient) {}

  Login(loginData: any): Observable<void> {
    console.log('login method called from service');
    return this.httpClient.post(this.baseUrl + 'login', loginData).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          const token = localStorage.getItem('token');

          this.decodedToken = this.jwtHelperService.decodeToken(token!);
          // console.log(this.decodedToken);
        }
      })
    );
  }
  Register(registerData: any): Observable<object> {
    return this.httpClient.post(this.baseUrl + 'register', registerData).pipe();
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelperService.isTokenExpired(token!);
  }
  getUserName(): string {
    try {
      const token = localStorage.getItem('token');

      this.decodedToken = this.jwtHelperService.decodeToken(token!);
      return this.decodedToken.unique_name;
    } catch (error) {
      return 'user';
    }
  }
}
