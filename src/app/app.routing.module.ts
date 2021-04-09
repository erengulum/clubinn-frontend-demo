import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { AuthGuard } from './services/security/auth.guard';
import { Role } from './entity/role';
import { AdminHomepageComponent } from "./group-by-roles/admin/admin-homepage/admin-homepage.component";
import { UserHomepageComponent } from "./group-by-roles/user/user-homepage/user-homepage.component";
import { UserProfileComponent } from "./group-by-roles/user/user-profile/user-profile.component";


const routes: Routes = [

  {
    path: 'user',
    canActivate: [AuthGuard],
    data: { roles: [Role.User] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: UserHomepageComponent },
      { path: 'profile', component: UserProfileComponent }

    ]
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminHomepageComponent }
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}