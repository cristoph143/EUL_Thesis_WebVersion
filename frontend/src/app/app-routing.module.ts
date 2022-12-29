import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent} from './authentication/signup/signup.component';
import { AuthGuard } from './authentication/services/auth-guard.service';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import { UploadResearchComponent } from './users/upload-research/upload-research.component';
import { OneComponent } from './users/sdg_pages/one.component';
import { ApproveComponent } from './users/approve/approve.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ChairmanDashboardComponent } from './chairman/chairman-dashboard/chairman-dashboard.component';

const routes: Routes = [
  {
    path: '', 
    component: LoginComponent
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
    path: 'approve',
    component: ApproveComponent
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
      },
      {
        path: 'one',
        component: OneComponent,
      }
    ]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'adminDashboard',
        component: AdminDashboardComponent,
      },
    ]
  },
  {
    path: 'chairman',
    component: ChairmanDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'chairmanDashboard',
        component: ChairmanDashboardComponent,
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
