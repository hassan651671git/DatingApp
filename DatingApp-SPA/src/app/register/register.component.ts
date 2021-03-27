import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertfyService } from '../_services/Alertfy.service';
import { AuthService } from '../_services/AuthService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output()
  cancelRegister = new EventEmitter();
   
  model: any={};
  constructor(private _authService: AuthService,private _alertifyService:AlertfyService) {}

  ngOnInit() {}
  cancleRegister(): void {
    this.cancelRegister.emit('true');
    // this._alertifyService.error("you cancelled registeration");
  }

  register(): void {
    console.log(this.model);
    this._authService.Register(this.model).subscribe(
      (next) => this._alertifyService.success("registered successfully"),
      (error) => this._alertifyService.error(error)
    );
  }
}
