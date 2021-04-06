import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs/ngx-bootstrap-tabs';
import { NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery-9';
import { User } from 'src/app/_models/User';
import { AlertfyService } from 'src/app/_services/Alertfy.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit,AfterViewInit {
  @ViewChild('tabsetComponent', { static: false }) tabSetComponent? : TabsetComponent;
  user?:User;
  galleryOptions: NgxGalleryOptions[]=[
    {},
    { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
    { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ];
  galleryImages?: NgxGalleryImage[];
 
   constructor(private _userService:UserService,private _alertfy:AlertfyService,private _activatedRoutr:ActivatedRoute)
    {
     
    }
  ngAfterViewInit(): void {
    this._activatedRoutr.queryParamMap.subscribe(data=>{
this.selectTab(+data.get('tab')!);
    });
   
  }


selectTab(tabId: number) 
{
  this.tabSetComponent!.tabs[tabId].active = true;
}

  ngOnInit(): void {
    this._activatedRoutr.data.subscribe(
      (data)=>{this.user=data['user'];}
      
    );
    this.galleryImages=this.getImages();
    
  }


  getImages()
  {
    const imagesUrls=[];
    for(let i=0;i < this.user!.photos!.length;i++){
      imagesUrls.push(
        {
          small:this.user!.photos![i].url,
          medium:this.user!.photos![i].url,
          big:this.user!.photos![i].url,
          description:this.user!.photos![i].description
        }
      );
    }
return imagesUrls;

  }

  loadUser(){
this._userService.getUser(+this._activatedRoutr.snapshot.paramMap.get('id')!).subscribe(
(data:User)=>{
  this.user=data;
},
(error)=>{
  this._alertfy.error(error);
}

);
  }

  onSelect(data: TabDirective): void
  {
      
  }
}
