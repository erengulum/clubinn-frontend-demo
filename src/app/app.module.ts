import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { ApiService } from './services/api.service';
import { JwtInterceptor } from './services/security/jwt.interceptor';
import { AuthenticationService } from './services/security/authentication.service';
import { AuthGuard } from './services/security/auth.guard';
import { ErrorInterceptor } from './services/security/authentication.interceptor';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { UnauthorizedComponent } from './common/unauthorized/unauthorized.component';
import { MatSliderModule } from '@angular/material/slider';
import { AdminHomepageComponent } from './group-by-roles/admin/admin-homepage/admin-homepage.component';
import { UserHomepageComponent } from './group-by-roles/user/user-homepage/user-homepage.component';
import { AdminLayoutComponent } from './group-by-roles/admin/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './group-by-roles/user/user-layout/user-layout.component';
import { AdminHeaderComponent } from './group-by-roles/admin/admin-layout/admin-header/admin-header.component';
import { UserHeaderComponent } from './group-by-roles/user/user-layout/user-header/user-header.component';
import { UserProfileComponent } from './group-by-roles/user/user-profile/user-profile.component';
import { SettingUserComponent } from './group-by-roles/user/setting-user/setting-user.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    UnauthorizedComponent,
    AdminHomepageComponent,
    UserHomepageComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    UserHeaderComponent,
    AdminHeaderComponent,
    UserProfileComponent,
    SettingUserComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule
  ],
  providers: [ApiService,AuthenticationService,AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}, //giden her requeste JWT token'ını ekliyor dogrulama icin
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  

  ],
  entryComponents:[JwtInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
