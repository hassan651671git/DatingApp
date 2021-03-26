import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor(private _authService: AuthService) {}

  ngOnInit() {}
  cancleRegister(): void {
    this.cancelRegister.emit('true');
  }

  register(): void {
    console.log(this.model);
    this._authService.Register(this.model).subscribe(
      (next) => console.log("registered successfully"),
      (error) => console.log(error)
    );
  }
}
