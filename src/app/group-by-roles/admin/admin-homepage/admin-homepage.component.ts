import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenDto } from 'src/app/entity/tokendto';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {
  currentUser: TokenDto;

  constructor(private authenticationService: AuthenticationService,    private router: Router) {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  ngOnInit(): void {
  }

  
subclubs(){
  this.router.navigate(['/admin/subclubs']);
}

clubcategories(){
  this.router.navigate(['/admin/clubcategories']);
}



}
