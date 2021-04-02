import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/User';
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
   
  user?: User;
  registerForm?:FormGroup;
  constructor(private _authService: AuthService,private _alertifyService:AlertfyService,
    private _formBuilder :FormBuilder,private _router: Router ) {}

  ngOnInit() {
this.createRegisterForm();

  }

  createRegisterForm():void{
    this.registerForm=this._formBuilder.group({
      gender:['male',],
     userName:['',Validators.required],
     knowAs:['',Validators.required],
     dateOfBirth:[null,Validators.required],
     city:['',Validators.required],
     country:['',Validators.required],  
     password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
     confirmPassword:['',Validators.required],
    },{validators:this.passwordMatchValidator});

     
  }

  passwordMatchValidator(formGroup:FormGroup){
    return formGroup.get('password')!.value === formGroup.get('confirmPassword')!.value?
    null: {mismatch:true};

  }

  cancleRegister(): void {
    this.cancelRegister.emit('true');
    // this._alertifyService.error("you cancelled registeration");
  }

  register(): void {
   if(this.registerForm?.valid){

    this.user=Object.assign({},this.registerForm.value);
this._authService.Register(this.user).subscribe(
      (next) =>{ 
        this._alertifyService.success("registered successfully");

    },
      (error) => this._alertifyService.error(error),
      ()=>{
        this._authService.Login(this.user).subscribe(
          ()=>{
               this._router.navigate(['/members']);

          },
          (error)=>{
              this._alertifyService.error(error);
          }

        );

      }
    );
   }

else{
  this._alertifyService.error("please complete all fields");
}

    // console.log(this.model);
    // this._authService.Register(this.model).subscribe(
    //   (next) => this._alertifyService.success("registered successfully"),
    //   (error) => this._alertifyService.error(error)
    // );
  }
}
