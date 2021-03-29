import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { EditMemberComponent } from './members/edit-member/edit-member.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { EditProfileCanDeactivateGuard } from './_guards/editProfile.guard';
import { MemberDetailsResolver } from './_resolvers/member-details-resolver';
import { MemberEditResolver } from './_resolvers/member-edit-resolver ';
import { MemberListResolver } from './_resolvers/member-list-resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path:'',
    runGuardsAndResolvers:'always',
     canActivate:[AuthGuard],
     children:[
      {
        path: 'members',
        component: MemberListComponent,
        resolve:{users:MemberListResolver}
        
      },
      {
        path: 'members/:id',
        component: MemberDetailsComponent,
        resolve:{user:MemberDetailsResolver},
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'lists',
        component: ListsComponent,
      },
      {
        path: 'member/edit',
        component: EditMemberComponent,
        resolve:{user:MemberEditResolver},
        canDeactivate:[EditProfileCanDeactivateGuard]
      }

     ]
  },
  
  {
    path: '**',
    redirectTo : '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
