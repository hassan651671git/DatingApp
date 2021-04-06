import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { PaginatedResult, Pagination } from '../_models/Pagination';
import { AlertfyService } from '../_services/Alertfy.service';
import { AuthService } from '../_services/AuthService';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages?:any;
 pagination?:Pagination;
  messageContainer:string="unread";
 

  constructor(private route:ActivatedRoute,private _alertfy:AlertfyService,
    private _userService:UserService,private _authService:AuthService)
    {


     }

  ngOnInit() {
    this.route.data.subscribe(
      data=>{
        this.pagination=data['messages'].pagination;
        this.messages =data['messages'].result;
    },
   error=>{
            this._alertfy.error(error);
   } 
    );


  }


  loadMessages(){

    this._userService.getMessages(+this._authService.currentUser?.id!,this.pagination?.currentPage,
      this.pagination?.itemsPerPage,this.messageContainer)
      .subscribe(
          (data:any)=>{
            this.pagination = data.pagination;
            this.messages = data.result;

          },
          (error)=>{
            this._alertfy.error(error);
          }

      );
  }

  pageChanged(event: any): void {
    this.pagination!.currentPage = event.page!;
    this.loadMessages();
     
   }


   deleteMessage(message:Message)
   {
     this._alertfy.confirm("are you sure you want to delete this message",
     ()=>{
      const userId=this._authService.currentUser?.id;
      this._userService.deleteMessage(+userId!,+message.id!).subscribe(
        (data)=>{
          const tempMessages:Message[]=this.messages;
          tempMessages.splice(tempMessages.findIndex(m=>m.id==message.id),1);
              this._alertfy.success("message deleted Successfully");
        },
        (error)=>{
          this._alertfy.error(error);
        }
      );
     },
     ()=>{});
    

   }

}
