import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClubCategoryDto } from 'src/app/entity/clubcategory';
import { formDto } from 'src/app/entity/formDto';
import { JoinDto } from 'src/app/entity/joinDto';
import { QuestionDto } from 'src/app/entity/questiondto';
import { SubClubDto } from 'src/app/entity/subclubdto';
import { ClubCategoryService } from 'src/app/services/clubcategoryservice';
import { QuestionnaireService } from 'src/app/services/questionnaireservice';
import { SubclubService } from 'src/app/services/subclubservice';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { TokenDto } from 'src/app/entity/tokendto';

declare var $: any;

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  term: string;
  getclubs: SubClubDto[];
  offeredsubclubs: SubClubDto[];
  joinedSubclubs: SubClubDto[];
  clubids: number[] = [];
  getForms: formDto[];
  clubidindex: number;
  submitted_check: boolean = false;
  offered_check: boolean = false;
  answers: number[] = [];
  counter = 0;
  currentUser: TokenDto;
  subclubindex: number;
  joinDto: JoinDto;
  numberOfJoinedSubClubs = 0;

  constructor(public httpClient: HttpClient, private subclubService: SubclubService,
    private formBuilder: FormBuilder, private modalService: NgbModal, private questionnaireService: QuestionnaireService, private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loadData();
    this.loadJoinedSubClubs(this.currentUser.username);

    this.joinDto = {
      username: '',
      subclubId: 0

    };
  }

  public loadData() {

    this.subclubService.getAllNonJoinedSubclubs().subscribe(
      (data) => {
        this.getclubs = data;
      },
      (error) => {
        alert('Bir hata meydana geldi lütfen tekrar deneyiniz!');
      }
    );


  }

  counterfor(i: number) {
    return new Array(i);
}


  select(subclubId) {
    this.clubids.push(subclubId);
    this.ngOnInit();

  }

  unselect(subclubId) {
    this.clubidindex = this.clubids.indexOf(subclubId);
    this.clubids.splice(this.clubidindex, 1);
    this.ngOnInit();
  }

  public submitclubid() {

    this.questionnaireService.sendclubid(this.clubids).subscribe(
      (data) => {
        this.getForms = data;
        console.log("Cevaplar: ", this.getForms);
        this.submitted_check = true;
      },
      (error) => {
        alert('Bir hata meydana geldi lütfen tekrar deneyiniz!');
      }
    );

  }

  submitted() {
    if (this.submitted_check == false && this.offered_check == false) {
      return 1;
    }
    if (this.submitted_check == true && this.offered_check == false) {
      return 2;
    }
    if (this.submitted_check == true && this.offered_check == true) {
      return 3;
    }
  }

  isExists(subclubId: number): Boolean {

    for (let i = 0; i < this.clubids.length; ++i) {
      if (this.clubids[i] == subclubId) {
        return false;
      }
    }

    //console.log("asagisi" + "==" + subclubId);
    return true;
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

  isJoined(subclubId: number): Boolean {
    this.numberOfJoinedSubClubs = this.joinedSubclubs.length;
    for (let i = 0; i < this.joinedSubclubs.length; ++i) {
      if (this.joinedSubclubs[i].id == subclubId) {
        return false;
      }
    }

    //console.log("asagisi" + "==" + subclubId);
    return true;
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

  add_one() {
    this.answers.push(1);
  }

  add_two() {
    this.answers.push(2);
  }

  add_three() {
    this.answers.push(3);
  }

  add_four() {
    this.answers.push(4);
  }

  add_five() {
    this.answers.push(5);
  }

  submit_all_answers() {
    for (let i = 0; i < this.getForms.length; i++) {
      for (let k = 0; k < 5; k++) {
        this.getForms[i].questionList[k].answer = this.answers[this.counter++];
      }
    }

    this.questionnaireService.sendcompletedform(this.getForms).subscribe(
      (data) => {
        this.offeredsubclubs = data;
        console.log("önerilenler: ", this.offeredsubclubs);
      },
      (error) => {
        alert('Bir hata meydana geldi lütfen tekrar deneyiniz!');
      }
    );
    console.log("cevaplar: ", this.answers);
    this.offered_check = true;
  }

  gotoSubclubPage(subclubId) {
    this.router.navigate(['/user/subclub/' + subclubId]);
  }

  isSelected() {
    if (this.clubids.length == 0) {
      return false;
    }
    return true;
  }
}
