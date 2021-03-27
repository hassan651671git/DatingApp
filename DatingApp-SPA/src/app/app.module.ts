import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponentComponent } from './navComponent/navComponent.component';
import{HttpClientModule}from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/AuthService';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/ErrorInterceptor';
import { AlertfyService } from './_services/Alertfy.service';

@NgModule({
  declarations: [				
    AppComponent,
      
      NavComponentComponent,
      HomeComponent,
      RegisterComponent
     
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [AuthService, ErrorInterceptorProvider,AlertfyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
