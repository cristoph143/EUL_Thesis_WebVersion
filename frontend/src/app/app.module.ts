import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import { NavigateComponent } from './navigate/navigate.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UploadResearchComponent } from './users/upload-research/upload-research.component';
import {MatTabsModule} from '@angular/material/tabs';
import { HomepageComponent } from './users/homepage/homepage.component';
import { ProfileComponent } from './users/profile/profile.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { OneComponent } from './users/sdg_pages/one.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { SearchComponent } from './users/search/search.component';
import { ResearchLibraryComponent } from './users/research-library/research-library.component';
import { UpdateDialogComponent } from './users/update-dialog/update-dialog.component';
import { ReadMoreComponent } from './users/read-more/read-more.component';
import { AuthGuard } from './authentication/services/auth-guard.service';
import { MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    NavigateComponent,
    NotFoundComponent,
    AdminComponent,
    SignupComponent,
    UploadResearchComponent,
    HomepageComponent,
    ProfileComponent,
    OneComponent,
    SearchComponent,
    ResearchLibraryComponent,
    UpdateDialogComponent,
    ReadMoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatTabsModule,
    CdkStepperModule, 
    MatStepperModule,
    MatSelectModule,
    MatSidenavModule,
    MatGridListModule,
    MatDialogModule,
    MatChipsModule,
    MatMenuModule,
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [OneComponent]
})
export class AppModule { }
