import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponentComponent } from './navComponent/navComponent.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/AuthService';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/ErrorInterceptor';
import { AlertfyService } from './_services/Alertfy.service';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberComponent } from './members/member/member.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberDetailsResolver } from './_resolvers/member-details-resolver';
import { MemberListResolver } from './_resolvers/member-list-resolver';
import 'hammerjs';
import { NgxGalleryModule } from 'ngx-gallery-9';
//import { NgxGalleryModule } from 'ngx-gallery';//Erroorrrrrrrrrrrrrrrrrr


export function TokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    NavComponentComponent,
    HomeComponent,
    RegisterComponent,
    MessagesComponent,
    ListsComponent,
    MemberComponent,
    MemberDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    NgxGalleryModule,
    BsDropdownModule.forRoot(),
    
        JwtModule.forRoot({
      config: {
        tokenGetter: TokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/auth'],
      },
    }),
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertfyService,
    AuthGuard,
    UserService,
    MemberDetailsResolver,
    MemberListResolver
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
