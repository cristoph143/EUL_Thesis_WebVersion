import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnhomeComponent } from './unhome/unhome.component';
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
  { path: '**', component: NotFoundComponent },
  /*
  Admin: dashboard, search, upload
  student: unhome, signin, enter code, register, homepage,
  search, specific research, add to library profile, upload research,

  */


  {
    path: '',
    component: UnhomeComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
