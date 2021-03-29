import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { EditMemberComponent } from '../members/edit-member/edit-member.component';
import { AlertfyService } from '../_services/Alertfy.service';
import { AuthService } from '../_services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class EditProfileCanDeactivateGuard implements CanDeactivate<EditMemberComponent> {
  constructor(private router: Router,private _authService : AuthService,
    private alertfy:AlertfyService){

  }
  canDeactivate(component: EditMemberComponent, currentRoute: ActivatedRouteSnapshot, 
    currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    if(component.editForm?.dirty){
          return confirm("Are you sure you want to discard changes?!");   
    }
    return true;
  }
   
}
