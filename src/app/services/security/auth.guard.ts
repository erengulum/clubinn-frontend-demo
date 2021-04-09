import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {

          if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
              // role not authorised so redirect to home page
              this.router.navigate(['/']);
              return false;
          }
          return true;
        }
       
        this.router.navigate(['/login']);
        return false;
    }
}
