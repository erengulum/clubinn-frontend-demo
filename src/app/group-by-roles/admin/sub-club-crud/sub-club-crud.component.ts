import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SubClubDto } from 'src/app/entity/subclubdto';
import { SubclubService } from 'src/app/services/subclubservice';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entity/user';
import { formDto } from 'src/app/entity/formDto';
import { QuestionDto } from 'src/app/entity/questiondto';


@Component({
  selector: 'app-sub-club-crud',
  templateUrl: './sub-club-crud.component.html',
  styleUrls: ['./sub-club-crud.component.css']
})
export class SubClubCRUDComponent implements OnInit {
  term: string;

  dataSource: SubClubDto[];
  memberList: User[] = [];
  createFormDto: formDto;
  questionOne: QuestionDto;
  questionTwo: QuestionDto;
  questionThree: QuestionDto;
  questionFour: QuestionDto;
  questionFive: QuestionDto;
  
  createQuestions: QuestionDto[] = [];
  subclubForm: FormGroup;
  createForm: FormGroup;
  currentSubclubId;
  currentAdmin: User;

  constructor(private formBuilder: FormBuilder, public httpClient: HttpClient,
    private subclubService: SubclubService, private modalService: NgbModal) {

    this.subclubForm = this.formBuilder.group({
      subClubName: ['', Validators.required],
      imageurl: ['', Validators.required],
      description: ['', Validators.required],
      clubCategoryId: ['', Validators.required]
    });

    this.createForm = this.formBuilder.group({
      formId: ['', Validators.required],
      subClubName: ['', Validators.required],
      questionOne: ['', Validators.required],
      questionTwo: ['', Validators.required],
      questionThree: ['', Validators.required],
      questionFour: ['', Validators.required],
      questionFive: ['', Validators.required]

    });

  }



  ngOnInit() {
    this.loadData();
    
  }




  public loadData() {

    this.subclubService.getAllSubclubs().subscribe(
      (data) => {
        console.log("Service data:", data);
        this.dataSource = data;
      },
      (error) => {
        alert('Bir hata meydana geldi lütfen tekrar deneyiniz!');
      }
    );
  }


  deleteSubClub(id) {


    this.subclubService.deleteById(id).subscribe(
      (data) => {
        console.log("Service data:", data);
        this.loadData();

      },
      (error) => {
        alert('Bir hata meydana geldi lütfen tekrar deneyiniz!');
      }
    );

  }




  closeResult = '';



  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  create(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }





  public save(): void {
    if (this.subclubForm.invalid) {
      // stop here if it's invalid
      alert('Invalid input');
      return;
    }
    this.subclubService.saveSubclub(this.subclubForm.getRawValue())
      .subscribe((): void => {
        alert('Saved!');
        this.ngOnInit();
      });
  }

  public saveForm(): void {
    var formid: number = +this.createForm.controls.formId.value;

    this.createQuestions[0] = new QuestionDto;
    this.createQuestions[1] = new QuestionDto;
    this.createQuestions[2] = new QuestionDto;
    this.createQuestions[3] = new QuestionDto;
    this.createQuestions[4] = new QuestionDto;
    this.createQuestions[0].questionContent = this.createForm.controls.questionOne.value;
    this.createQuestions[1].questionContent = this.createForm.controls.questionTwo.value;
    this.createQuestions[2].questionContent = this.createForm.controls.questionThree.value;
    this.createQuestions[3].questionContent = this.createForm.controls.questionFour.value;
    this.createQuestions[4].questionContent = this.createForm.controls.questionFive.value;


    this.createFormDto = {formId:formid,bagliolduguGrup:this.createForm.controls.subClubName.value,questionList:this.createQuestions};
    console.log(this.createFormDto.questionList);
    if (this.createForm.invalid) {
      // stop here if it's invalid
      alert('Invalid input');
      return;
    }
    this.subclubService.saveForm(this.createFormDto)
      .subscribe((): void => {
        alert('Saved!');
      });
  }


  openAdminList(content, subclubId) {
    this.currentSubclubId = subclubId;
    this.getAdmin();
    this.getSubclubMemberList();

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.ngOnInit();

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.ngOnInit();

    });



  }


  getSubclubMemberList() {
    this.subclubService.getMembersBySubclubId(this.currentSubclubId).subscribe(
      (data) => {
        this.memberList = data;
      },
      (error) => {
        alert('Bu kulüpte hiç üye bulunmamaktadır!');
      }
    );

  }

  assignAdmin(userId) {
    this.subclubService.assignAdmin(this.currentSubclubId, userId).subscribe(
      (data) => {
        alert('New admin is successfully assigned!');
      },
      (error) => {
        alert('Bir hata meydana geldi lütfen tekrar deneyiniz!');
      }
    );
  }

  getAdmin() {

    this.subclubService.getAdmin(this.currentSubclubId).subscribe(
      (data) => {
        this.currentAdmin = data;
      },
      (error) => {
      }
    );

  }

}
function createFormDto(arg0: string, createFormDto: any) {
  throw new Error('Function not implemented.');
}

