import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthGuard } from './authentication/services/core/auth-guard.service';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import { UploadResearchComponent } from './users/upload-research/upload-research.component';
import { OneComponent } from './users/sdg_pages/one.component';
import { ApproveComponent } from './users/approve/approve.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ChairmanDashboardComponent } from './chairman/chairman-dashboard/chairman-dashboard.component';
import { RoleGuardsComponent } from './authentication/services/core/role-guards.service';
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
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuardsComponent],
    data: {
      expectedRoles: ['Admin'],
    },
    children: [
      {
        path: 'adminDashboard',
        component: AdminDashboardComponent,
      },
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
    path: 'chairman',
    component: ChairmanDashboardComponent,
    canActivate: [AuthGuard, RoleGuardsComponent],
    data: {
      expectedRoles: ['Chairman'],
    },
    children: [
      {
        path: 'chairmanDashboard',
        component: ChairmanDashboardComponent,
      },
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
    path: 'home',
    component: UserDashboardComponent,
    canActivate: [AuthGuard, RoleGuardsComponent],
    data: {
      expectedRoles: ['Teacher','Student'],
    },
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
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
