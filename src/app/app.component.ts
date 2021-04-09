import { Component } from '@angular/core';


import { Router } from '@angular/router';

import { AuthenticationService } from './services/security/authentication.service';
import { User } from './entity/user';
import { Role } from './entity/role';
import { TokenDto } from './entity/tokendto';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentUser: TokenDto;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
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
}