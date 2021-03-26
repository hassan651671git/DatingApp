import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode: boolean = true;
 
  constructor(private httpClient:HttpClient) {}

  ngOnInit() {
   
  }

  cancelRegisterHome(data: string): void {
    this.registerMode = false;
  }

    
   
}