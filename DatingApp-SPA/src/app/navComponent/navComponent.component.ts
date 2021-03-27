import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertfyService } from '../_services/Alertfy.service';
import { AuthService } from '../_services/AuthService';

@Component({
  selector: 'app-navComponent',
  templateUrl: './navComponent.component.html',
  styleUrls: ['./navComponent.component.css'],
})
export class NavComponentComponent implements OnInit {
  model: any = {};
  form1: any = {};
  constructor(public _authService: AuthService,private _alertifyService:AlertfyService,
    private router:Router) {}

  login(): void {
    console.log(JSON.stringify(this.model));
    this.model=this.model;
    this._authService.Login(this.model).subscribe(
      (data:any) => {
        const user=data;
       
        this._alertifyService.success("logedin successfully");
        
      },
      (error) => this._alertifyService.error(error),
      ()=>{ this.router.navigate(['/members']);}
    );
  }
  logedIn():boolean{
    return this._authService.isLoggedIn();
  }

  logOut(){
    localStorage.removeItem('token');
    this._alertifyService.message("you are logged out");
    this.router.navigate(['/home']);
  }
  ngOnInit() {}
}
