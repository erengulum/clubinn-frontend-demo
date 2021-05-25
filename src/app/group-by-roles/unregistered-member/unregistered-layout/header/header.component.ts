import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/entity/role';
import { TokenDto } from 'src/app/entity/tokendto';
import { AuthenticationService } from 'src/app/services/security/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: TokenDto;

  constructor(         private router: Router,    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

   }

  ngOnInit(): void {
    console.log("üyeee:" + this.currentUser);
  }

  
clubcategories(){
  this.router.navigate(['/unregistered/categories']);
}

login(){
  this.router.navigate(['/login']);
}

register(){
  this.router.navigate(['/register']);
}

}
