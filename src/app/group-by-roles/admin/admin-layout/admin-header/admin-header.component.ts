import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/entity/role';
import { TokenDto } from 'src/app/entity/tokendto';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

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

adminHomepage() {
  this.router.navigate(['/admin/home']);
}


}
