import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { pipe } from 'rxjs';
import { Photo } from 'src/app/_models/Photo';
import { AlertfyService } from 'src/app/_services/Alertfy.service';
import { AuthService } from 'src/app/_services/AuthService';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})

export class PhotoEditorComponent implements OnInit {

  @Input() photos?: Photo [];
  uploader!:FileUploader;
  hasBaseDropZoneOver?:boolean=false;
  response?:string;
  baseUrl=environment.apiBaseUrl;
  currentMainPhoto?:Photo;
 
  constructor(private _authService:AuthService,private _userService:UserService,
    private _alertfy:AlertfyService) 
    { 

    }

  ngOnInit() {
    this.initialize();
  }


  initialize():void
  {
    this.uploader=new FileUploader({
url:this.baseUrl+'users/'+this._authService.decodedToken.nameid+'/photos',
authToken:'Bearer  '+localStorage.getItem('token'),
isHTML5:true,
allowedFileType:['image'],
removeAfterUpload:true,
autoUpload:false,
maxFileSize:10*1024*1024,
  });
  this.uploader.onAfterAddingFile=(file)=>{file.withCredentials=false;};
  this.uploader.onSuccessItem=(items,response,status,headers)=>{
if(response){
   const res:Photo=JSON.parse(response);
   const photo={
     id:res.id,
     url: res.url,
     datedAdd: res.dateAdded,
     description: res.description,
     isMain: res.isMain
   };
   if(res.isMain){
     this._authService.changeMemberPhoto(res.url);
     this._authService.currentUser!.photoUrl=photo.url;
     localStorage.setItem('userInfo',JSON.stringify(this._authService.currentUser ));
   }
   this.photos?.push(res);
}
  };
     
  }
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }


  public setMainPhoto(photo:Photo){
    this._userService.setMainPhoto(this._authService.decodedToken.nameid,photo.id).subscribe(
      ()=>{
           // this._alertfy.success('Saved successfully');
           this.currentMainPhoto =this.photos?.filter(p=>p.isMain)[0];
           this.currentMainPhoto!.isMain=false;
            photo.isMain=true;
            this._authService.changeMemberPhoto(photo!.url);
            this._authService.currentUser!.photoUrl=photo.url;
            localStorage.setItem('userInfo',JSON.stringify(this._authService.currentUser ));


      },
      (error)=>{
            console.log(error);
            this._alertfy.error('Error Saving Photo');
      }
      
    );
  }

  public deletePhoto(photo:Photo)
  {
    this._alertfy.confirm("are you sure to delete this photo?",()=>{
      this._userService.deletePhoto(this._authService.decodedToken.nameid,photo.id)
      .subscribe(
             ()=>{
               this._alertfy.success("deleted Successfully");
                
              this.photos?.splice(this.photos.findIndex(p=>p.id===photo.id),1);
              },
              (error)=>{
                this._alertfy.error(error);
              });
            },()=>{});




}
}