import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent} from './authentication/signup/signup.component';
import { AuthGuard } from './authentication/services/auth-guard.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'login',
  //   pathMatch: 'full',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'user-dashboard',
  //   component: UserDashboardComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: '', 
    component: LoginComponent
  },
  {
    path: 'signup', 
    component: SignupComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'home', 
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: UserDashboardComponent,
      }
    ]
  },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
