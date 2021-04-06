import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/_models/Pagination';
import { User } from 'src/app/_models/User';
import { AlertfyService } from 'src/app/_services/Alertfy.service';
import { AuthService } from 'src/app/_services/AuthService';
import { UserService } from 'src/app/_services/user.service';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {




  users?: User[];
  paginationData?:Pagination;
  currentUser?:User;
  userParams?:any={};
  radioModel?:string;
  genderList=[{value:'male',select:'Males'},{value:'female',select:'Females'}];


  constructor(
    private _userService: UserService,
    private alertfy: AlertfyService,
    private _route:ActivatedRoute,
    private _authService:AuthService) 
      {
          this.currentUser! =this._authService.currentUser!;
          this.resetFilters();

      }

  ngOnInit() {
    this._route.data.subscribe(
      (data)=>{
        this.users=data['users'].result;
        this.paginationData=data['users'].pagination;
         
      }
    );
    }

    resetFilters():void
    {
      this.userParams.gender=this.currentUser?.gender==='female'?'male':'female';
      this.userParams.minAge=18;
      this.userParams.maxAge=99;
     this.userParams.orderBy="lastActive";
      this.loadUsers();


    }
    loadUsers(){
    
    this._userService.getUsers( this.paginationData?.currentPage,this.paginationData?.itemsPerPage,this.userParams).subscribe(
      (data) => {
        this.users= data.result;
        this.paginationData=data.pagination;
      },
      (error) => {
        this.alertfy.error(error);
      }
    );
    }
    pageChanged(event: any): void {
      this.paginationData!.currentPage = event.page!;
      this.loadUsers();
       
     }
}
