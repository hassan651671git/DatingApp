import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { AlertfyService } from 'src/app/_services/Alertfy.service';
import { UserService } from 'src/app/_services/user.service';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users?: User[];
  constructor(
    private _userService: UserService,
    private alertfy: AlertfyService,
    private _route:ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.data.subscribe(
      (data)=>{this.users=data['users'];}
    );

    // this._userService.getUsers().subscribe(
    //   (data) => {
    //     this.users = data;
    //   },
    //   (error) => {
    //     this.alertfy.error(error);
    //   }
    // );
  }
}
