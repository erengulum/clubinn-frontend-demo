import { Component, OnInit } from '@angular/core';
import { TokenDto } from 'src/app/entity/tokendto';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit {
  currentUser: TokenDto;

  constructor(private authenticationService: AuthenticationService) {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(): void {
  }

}
