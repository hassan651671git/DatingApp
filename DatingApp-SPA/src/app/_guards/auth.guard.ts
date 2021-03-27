import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertfyService } from '../_services/Alertfy.service';
import { AuthService } from '../_services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private _authService : AuthService,
    private alertfy:AlertfyService){

  }
  canActivate():boolean{ 
  if(this._authService.isLoggedIn()){
    return true;
  }else{
    this.alertfy.error('you are Not Logged in!');
    
    return false;
  }
    
  }
  
}
