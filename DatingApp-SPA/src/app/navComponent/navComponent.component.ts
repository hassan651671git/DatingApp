import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/AuthService';

@Component({
  selector: 'app-navComponent',
  templateUrl: './navComponent.component.html',
  styleUrls: ['./navComponent.component.css'],
})
export class NavComponentComponent implements OnInit {
  model: any = {};
  form1: any = {};
  constructor(private _authService: AuthService) {}

  login(): void {
    console.log(JSON.stringify(this.model));
    this.model=this.model;
    this._authService.Login(this.model).subscribe(
      (data:any) => {
        const user=data;
        localStorage.setItem('token',user.token);
      },
      (error) => console.log(error)
    );
  }
  logedIn():boolean{
    return !!localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
  }
  ngOnInit() {}
}
