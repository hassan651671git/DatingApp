import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  baseUrl: string = environment.apiBaseUrl + 'users/';

  //   httpOptions = {
  //   headers: new HttpHeaders({
  //     Authorization: 'Bearer ' + localStorage.getItem('token'),
  //   }),
  // };

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl );
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + id);
  }

  updateUser(id:number,user: User){
   return this.httpClient.put(this.baseUrl+'update/' +id,user);

  }

  setMainPhoto(userId:number,id:number){
    return this.httpClient.put(this.baseUrl+userId+"/photos/"+id+"/setmain",{});
  }

  deletePhoto(userId:number,id:number){
    return this.httpClient.delete(this.baseUrl+userId+"/photos/"+id,{});
  }


}
