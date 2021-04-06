import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { error } from 'selenium-webdriver';
import { Pagination } from 'src/app/_models/Pagination';
import { AlertfyService } from 'src/app/_services/Alertfy.service';
import { AuthService } from 'src/app/_services/AuthService';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-MesseagesThread',
  templateUrl: './MesseagesThread.component.html',
  styleUrls: ['./MesseagesThread.component.css']
})
export class MesseagesThreadComponent implements OnInit {
  messages?:any;
  pagination?:Pagination;
  userId?:number;
  @Input()
  recipientId?:number;
  messageContent?:string;
  constructor(private _userService:UserService,private _authService:AuthService,private _alertfy:AlertfyService) 
  { 
    this.userId=+this._authService.currentUser?.id!;
  }

  ngOnInit()
  {
    this.loadMessages();
  }

  loadMessages(){

    this._userService.getMessagesThread(this.userId!,this.recipientId!)
    .pipe(
       tap( (data)=>{
         const userId=+this._authService.currentUser?.id!;
         for(let i=0;i<data.result?.length!;i++)
         {
           const message= data?.result![i];
              if(message.isRead ===false && message.recipientId ===userId )
              {
                this._userService.markMessageAsRead(userId,message.id)
              }
         }   
      }
       )

    )
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

  sendMessage(){

this._userService.sendMessage(this.userId!,this.recipientId!,this.messageContent!).subscribe(
data=>{
     this.messages.unshift(data);
     this.messageContent='';
    
},
error=>{
  this._alertfy.error("error occur while sending message");
}


);

  }

}
