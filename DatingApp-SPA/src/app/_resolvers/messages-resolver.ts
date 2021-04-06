import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { PaginatedResult } from "../_models/Pagination";
import { User } from "../_models/User";
import { AlertfyService } from "../_services/Alertfy.service";
import { AuthService } from "../_services/AuthService";
import { UserService } from "../_services/user.service";
@Injectable()
export class MessagesResolver implements Resolve<PaginatedResult< Message[]>>{

    messages?:Message[];
    constructor(private _userService:UserService,private _router :Router,
         private _alertfy:AlertfyService,private _authService:AuthService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<PaginatedResult<Message[]>>  {
        let id = +this._authService.currentUser?.id!;
        let pageNumber=1;
        let pageSize=10;
         return this._userService.getMessages(id,pageNumber,pageSize,'unread')
         .pipe(
             catchError(error=>
             {
                 this._alertfy.error(error);
                   this._router.navigate(['/home']);
                   let messages:any;
                   return of(messages);
                  
             })
         );
    }
    
} 