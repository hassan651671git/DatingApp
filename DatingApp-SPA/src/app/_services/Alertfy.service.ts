import { Injectable } from '@angular/core';
declare let alertify: any;
@Injectable({
  providedIn: 'root',
})
export class AlertfyService {
  constructor() {}

  confirm(message: string, okCallBack: () => any, cancelCallBack: () => any) {
    alertify.confirm(message,  (e:any)=> {
        if (e) {
          okCallBack();
        } else {
          cancelCallBack();
        }
      });
  }
  success(message:string){
    alertify.success(message);
  }

  error(message:string){
    alertify.error(message);
  }
  warninig(message:string){
    alertify.warninig(message);
  }
  message(message:string){
    alertify.message(message);
  }
}
