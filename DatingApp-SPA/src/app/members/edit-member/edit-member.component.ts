import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { AlertfyService } from 'src/app/_services/Alertfy.service';
import { AuthService } from 'src/app/_services/AuthService';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css'],
})
export class EditMemberComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  user!: User;
photoUrl?:String;
  // this function didn't work unitl now
  @HostListener('window:beforeunLoad', ['$event'])
  unloadNotification($event: any) {
    if (!this.editForm?.dirty) $event.returnValue = true;
  }
  constructor(
    private _route: ActivatedRoute,
    private _alertfy: AlertfyService,
    private _userService: UserService,
    private _athService: AuthService
  ) {}

  ngOnInit() {
    this._route.data.subscribe((data) => {
      this.user = data['user'];
    });
    this._athService.photoUrlBehavior.asObservable().subscribe(

      (value)=>{
          this.photoUrl=value;
      }
    );
  }

  editProfile() {
    const id = this._athService.decodedToken.nameid;
    this._userService.updateUser(id, this.user!).subscribe(
      (next) => {

        this._alertfy.success('profile Updated sccessfully');
        this.editForm?.reset(this.user);
      },
      (error) => {
       this._alertfy.error("there is an error occured");
        console.log(error);
      }
    ); 
  }


    
}
