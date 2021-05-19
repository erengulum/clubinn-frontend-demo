import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/entity/role';
import { TokenDto } from 'src/app/entity/tokendto';
import { AuthenticationService } from 'src/app/services/security/authentication.service';


@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent implements OnInit {

  currentUser: TokenDto;

  constructor(         private router: Router,    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(): void {
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
}

get isUser() {
    return this.currentUser && this.currentUser.role === Role.User;
}

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

profile() {
  this.router.navigate(['/user/profile']);
}

settings() {
  this.router.navigate(['/user/settings']);
}

homepage() {
  this.router.navigate(['/user/home']);
}

clubcategories(){
  this.router.navigate(['/user/categories']);
}

mysubclubs(){
  this.router.navigate(['/user/mysubclubs']);
}


}
