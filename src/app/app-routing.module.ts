import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UnhomeComponent } from './unhome/unhome.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UnhomeComponent,
  },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: LoginComponent,
  // },
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
