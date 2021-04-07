import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';
@Injectable()
export class AuthService {
  jwtHelperService = new JwtHelperService();
  decodedToken: any;
  currentUser?:User;
  baseUrl: string = environment.apiBaseUrl+'auth/';
  photoUrlBehavior=new BehaviorSubject<String>('../../assets/avatar.png');
  //currentPhotoUrl=this.photoUrl.asObservable();

  constructor(private httpClient: HttpClient) {
    if(this.isLoggedIn()){
      const token = localStorage.getItem('token');
      this.decodedToken = this.jwtHelperService.decodeToken(token!);
       const user=localStorage.getItem('userInfo')!;
      this.currentUser=JSON.parse(user);
       this.changeMemberPhoto(this.currentUser?.photoUrl!);
      }

  }

  changeMemberPhoto(url:string)
  {
      this.photoUrlBehavior.next(url);
  }

  Login(loginData: any): Observable<void> {
    console.log('login method called from service');
    return this.httpClient.post(this.baseUrl + 'login', loginData).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('userInfo',JSON.stringify(user.userInfo));
         
          const token = localStorage.getItem('token');

          this.decodedToken = this.jwtHelperService.decodeToken(token!);
         this.currentUser! =user.userInfo;
         this.photoUrlBehavior.next(this.currentUser?.photoUrl!);
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


  logOut():void {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    this.currentUser = undefined;
    this.decodedToken = undefined;
  }
}
