import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { PaginatedResult } from "../_models/Pagination";
import { User } from "../_models/User";
import { AlertfyService } from "../_services/Alertfy.service";
import { UserService } from "../_services/user.service";
@Injectable()
export class MemberListResolver implements Resolve<PaginatedResult< User[]>>{

    user?:User[];
    constructor(private _userService:UserService,private _router :Router,
         private _alertfy:AlertfyService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<PaginatedResult<User[]>>  {
         return this._userService.getUsers()
         .pipe(
             catchError(error=>
             {
                 this._alertfy.error(error);
                   this._router.navigate(['/home']);
                   let user:any;
                   return of(user);
                  
             })
         );
    }
    
} 