import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SubClubDto } from 'src/app/entity/subclubdto';
import { SubclubService } from 'src/app/services/subclubservice';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chatservice';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { TokenDto } from 'src/app/entity/tokendto';

@Component({
  selector: 'app-subclubmembership',
  templateUrl: './subclubmembership.component.html',
  styleUrls: ['./subclubmembership.component.css']
})
export class SubclubmembershipComponent implements OnInit {
  term: string;

  subclubs: SubClubDto[] = [];
  searchMode: boolean = false;
  currentUser:TokenDto;



  constructor(public httpClient: HttpClient, private subclubService:SubclubService, 
    private route: ActivatedRoute, private router: Router, private chatservice:ChatService,
     private authenticationService: AuthenticationService
    ) { this.authenticationService.currentUser.subscribe(x => this.currentUser = x); }


  
  ngOnInit() {
    console.log("sayfaya giren user" + this.currentUser.username);

    this.loadJoinedSubClubs(this.currentUser.username);

  }


  
   loadJoinedSubClubs(username:string) {

    this.subclubService.getAllJoinedSubclubs(username).subscribe(
      (data)=>{

        this.subclubs = data;
      },
      (error)=>{
        console.log("hata var");
      }
    );
}


openSubclubPage(subclubId){
  console.log("subclub id::" + subclubId); 
  this.router.navigate(['/user/subclub/' + subclubId]);

}




}
