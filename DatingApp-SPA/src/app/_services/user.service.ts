import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/Pagination';
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

  getUsers(
    page?: number,
    itemsPerPage?: number,
    userParams?:any,
    likesParam?:string
  ): Observable<PaginatedResult<User[]>> {
    const paginationResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();
    var myParams = new HttpParams();

    if (page != null && itemsPerPage != null) {
      myParams = myParams.append('pageNumber', page.toString()!);
      myParams = myParams.append('pageSize', itemsPerPage.toString()!);
    }
    if(userParams!=undefined)
    {
      myParams = myParams.append('gender', userParams.gender);
      myParams = myParams.append('minAge', userParams.minAge);
      myParams = myParams.append('maxAge', userParams.maxAge);
      myParams = myParams.append('orderBy', userParams.orderBy);
    }
    if(likesParam=='likees')
    {
      myParams = myParams.append('likees', 'true');
    }

    if(likesParam=='likers')
    {
      myParams = myParams.append('likers', 'true');
    }
 
   
    return this.httpClient
      .get<User[]>(this.baseUrl, { observe: 'response', params: myParams })
      .pipe(
        map((response) => {
          paginationResult.result = response.body!;
           
          if (response.headers.get('Pagination')  != null) {
            paginationResult.pagination = JSON.parse(
              response.headers.get('Pagination')!
            );
          }
          return paginationResult;
        })
      );
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + id);
  }

  updateUser(id: number, user: User) {
    return this.httpClient.put(this.baseUrl + 'update/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.httpClient.put(
      this.baseUrl + userId + '/photos/' + id + '/setmain',
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.httpClient.delete(this.baseUrl + userId + '/photos/' + id, {});
  }

  sendLike(userId:number,likeeId:number){
    return this.httpClient.post(this.baseUrl+userId+'/like/'+likeeId,{});
  }
}
