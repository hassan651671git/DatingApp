import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'hammerjs';
import { AuthService } from './_services/AuthService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'DatingApp-SPA';
  private jwtHelperService:JwtHelperService=new JwtHelperService();
constructor(private _authService:AuthService){

}

  ngOnInit(): void {
   
  }
}
