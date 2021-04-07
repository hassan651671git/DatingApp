import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../_models/Pagination';
import { User } from '../_models/User';
import { AlertfyService } from '../_services/Alertfy.service';
import { AuthService } from '../_services/AuthService';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
users?:User[];
paginationData?:Pagination;
userParams?:any={};
likesParam:string='likers';
 genderList=[{value:'male',select:'Males'},{value:'female',select:'Females'}];

  constructor(private _authService:AuthService,private _alertfy:AlertfyService,
    private _userService:UserService,private _route:ActivatedRoute) {
      this.resetFilters();



     }

        ngOnInit() {
      this._route.data.subscribe(
      (data)=>{
        this.users=data['users'].result;
        this.users=data['users'].pagination;
      },
      (error)=>{
        this._alertfy.error("an error has occured");
      });

      this.likesParam='likers';
  }

  pageChanged(event: any): void {
    this.paginationData!.currentPage = event.page!;
    this.loadUsers();
     
   }


   loadUsers(){ 
  this._userService.getUsers( this.paginationData?.currentPage,this.paginationData?.itemsPerPage,
    this.userParams,this.likesParam).subscribe(
    (data) => {
      this.users= data.result;
      this.paginationData=data.pagination;
    },
    (error) => {
      this._alertfy.error(error);
    }
  );
  }
  resetFilters():void
  {
    this.userParams.gender=this._authService.currentUser?.gender==='female'?'male':'female';
    this.userParams.minAge=18;
    this.userParams.maxAge=99;
   this.userParams.orderBy="lastActive";
    this.loadUsers();

  }
likeChanged(value:string){
  this.likesParam=value;
  this.loadUsers();
}

}
