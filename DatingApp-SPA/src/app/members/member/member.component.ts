import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  @Input() user?:User;
  username="hassan";
  age=55;
  city="cairo";


  constructor() { }

  ngOnInit(): void {
  
  }

}
