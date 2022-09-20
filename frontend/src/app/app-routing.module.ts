import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent} from './authentication/signup/signup.component';
import { AuthGuard } from './authentication/services/auth-guard.service';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import { UploadResearchComponent } from './users/upload-research/upload-research.component';

const routes: Routes = [
  // default route
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', 
    component: LoginComponent,
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'signup', 
    component: SignupComponent
  },
  {
    path: 'home', 
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: UserDashboardComponent,
      },
      {
        path: 'upload',
        component: UploadResearchComponent,
      }
    ]
  },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
