import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  // {
  //   path: 'admin', component: AdminDashboardComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     role: 'ROLE_ADMIN'
  //   }
  // },
  // { path: 'user', component: UserDashboardComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     role: 'ROLE_USER'
  //   }
  // },
  /*
  Admin: dashboard, search, upload
  student: unhome, signin, enter code, register, homepage,
  search, specific research, add to library profile, upload research,

  */


  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
