import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { AuthGuard } from './services/security/auth.guard';
import { Role } from './entity/role';
import { AdminHomepageComponent } from "./group-by-roles/admin/admin-homepage/admin-homepage.component";
import { UserHomepageComponent } from "./group-by-roles/user/user-homepage/user-homepage.component";
import { UserProfileComponent } from "./group-by-roles/user/user-profile/user-profile.component";
import { SettingUserComponent } from "./group-by-roles/user/setting-user/setting-user.component";
import { ClubCategoriesCRUDComponent } from "./group-by-roles/admin/club-categories-crud/club-categories-crud.component";
import { SubClubCRUDComponent } from "./group-by-roles/admin/sub-club-crud/sub-club-crud.component";
import { ClubgroupslistingComponent } from "./group-by-roles/user/clubgroupslisting/clubgroupslisting.component";
import { SubclubsgridComponent } from "./group-by-roles/user/subclubsgrid/subclubsgrid.component";
import { ChatComponent } from "./group-by-roles/user/chat/chat.component";
import { SubclubmembershipComponent } from "./group-by-roles/user/subclubmembership/subclubmembership.component";
import { SubclubpageComponent } from "./group-by-roles/user/subclubpage/subclubpage.component";


const routes: Routes = [

  {
    path: 'user',
    canActivate: [AuthGuard],
    data: { roles: [Role.User] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: UserHomepageComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'settings', component: SettingUserComponent },
      { path: 'mysubclubs', component: SubclubmembershipComponent },
      { path: 'subclub/:subClubId', component: SubclubpageComponent },
      { path: 'categories', component: ClubgroupslistingComponent },
      { path: 'categories/subclubs/:categoryId', component: SubclubsgridComponent },
      { path: 'categories/subclubs/:categoryId/chat', component: ChatComponent }

    ]
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminHomepageComponent },
      { path: 'clubcategories', component: ClubCategoriesCRUDComponent },
      { path: 'subclubs', component: SubClubCRUDComponent }
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