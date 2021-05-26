import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubClubDto } from 'src/app/entity/subclubdto';
import { SubclubService } from 'src/app/services/subclubservice';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chatservice';
import { JoinDto } from 'src/app/entity/joinDto';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { TokenDto } from 'src/app/entity/tokendto';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-subclubsgrid',
  templateUrl: './subclubsgrid.component.html',
  styleUrls: ['./subclubsgrid.component.css']
})
export class SubclubsgridComponent implements OnInit {
  term: string;

  joinedSubclubs: SubClubDto[] = [];

  subclubs: SubClubDto[] = [];


  currentCategoryId;
  joinDto: JoinDto = null;
  previousCategoryId: number = 1;
  searchMode: boolean = false;


  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  currentUser: TokenDto;
  previousKeyword: string = null;

  numberOfJoinedSubClubs=0;



  constructor(public httpClient: HttpClient, private subclubService: SubclubService,
    private route: ActivatedRoute, private router: Router, private chatservice: ChatService,
    private authenticationService: AuthenticationService
  ) { this.authenticationService.currentUser.subscribe(x => this.currentUser = x); }



  ngOnInit() {
    this.currentCategoryId = this.route.snapshot.paramMap.get('categoryId');
    this.loadSubClubsByCategory();
    this.loadJoinedSubClubs(this.currentUser.username);

    this.joinDto = {
      username: '',
      subclubId: 0

    };


  }


  public loadSubClubsByCategory() {

    this.subclubService.getAllSubClubsByCategory(this.currentCategoryId).subscribe(
      (data) => {
        console.log("Service data+:", data);
        this.subclubs = data;

      },
      (error) => {
        console.log("hata var");
      }
    );
  }


  loadJoinedSubClubs(username: string) {

    this.subclubService.getAllJoinedSubclubs(username).subscribe(
      (data) => {
        console.log("joined subs", data);

        this.joinedSubclubs = data;

      },
      (error) => {
        console.log("hata var");
      }
    );
  }


  

  join(subclubId) {
    this.joinDto.username = this.currentUser.username;
    this.joinDto.subclubId = subclubId;

    this.subclubService.joinSubClub(this.joinDto).subscribe(
      (data) => {
        alert("Basariyla kaydoldunuz");
        this.ngOnInit();

      },
      (error) => {
        console.log("hata var");
      }
    );
  }


  isExists(subclubId: number): Boolean {
    this.numberOfJoinedSubClubs = this.joinedSubclubs.length;
    for (let i = 0; i < this.joinedSubclubs.length; ++ i) {
      if (this.joinedSubclubs[i].id==subclubId) {
        return false;            
      }
    }
    //console.log("asagisi" + "==" + subclubId);
    return true;
  }

  gotoSubclubPage(subclubId){

    this.router.navigate(['/user/subclub/' + subclubId]);

  }

  goToQuestionairePage(){
    this.router.navigate(['/user/questionnaire']);
  }



}
