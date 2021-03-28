import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_models/User";
import { AlertfyService } from "../_services/Alertfy.service";
import { UserService } from "../_services/user.service";
@Injectable()
export class MemberDetailsResolver implements Resolve<User>{

    user?:User;
    constructor(private _userService:UserService,private _router :Router,
         private _alertfy:AlertfyService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<User>  {
         return this._userService.getUser(+route.params['id']!)
         .pipe(
             catchError(error=>
             {
                 this._alertfy.error(error);
                   this._router.navigate(['/members']);
                   return of(this.user!);
                  
             })
         );
    }
    
} 