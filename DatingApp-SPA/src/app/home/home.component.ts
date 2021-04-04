import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/AuthService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  userLoggedOn=false;
  constructor(private httpClient:HttpClient,private _authService:AuthService) {}

  ngOnInit() {
    this.userLoggedOn=this._authService.isLoggedIn();
  }

  cancelRegisterHome(data: string): void {
    this.registerMode = false;
  }

    
   
}
