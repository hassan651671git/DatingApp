import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { AlertfyService } from 'src/app/_services/Alertfy.service';
import { AuthService } from 'src/app/_services/AuthService';
import { UserService } from 'src/app/_services/user.service';

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
    isLiked:boolean=false;

  constructor(private _authService:AuthService,private _userService:UserService,
    private _alertfy:AlertfyService) { }

  ngOnInit(): void {
     
  }

  sendLike()
  {
    const id=this._authService.currentUser?.id!;
    this._userService.sendLike(+id,+this.user?.id!).subscribe(
      ()=>{

        this._alertfy.success("You Liked It");
        this.isLiked=true;
      },
      (error)=>{
         this._alertfy.error(error);
      }

    );

  }

}
