import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SubClubDto } from 'src/app/entity/subclubdto';
import { SubclubService } from 'src/app/services/subclubservice';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from 'src/app/entity/user';
import { Feedback } from 'src/app/entity/feedback';


@Component({
  selector: 'app-sub-club-crud',
  templateUrl: './sub-club-crud.component.html',
  styleUrls: ['./sub-club-crud.component.css']
})
export class SubClubCRUDComponent implements OnInit {
  term: string;

  dataSource: SubClubDto[];
  memberList: User[] = [];
  feedbackList: Feedback[] = [];

  subclubForm: FormGroup;
  currentSubclubId;
  currentAdmin: User;

  constructor(private formBuilder: FormBuilder, public httpClient: HttpClient,
     private subclubService:SubclubService, private modalService: NgbModal) { 

    this.subclubForm = this.formBuilder.group({
      subClubName: ['', Validators.required],
      imageurl:['', Validators.required], 
      description: ['', Validators.required],
      clubCategoryId: ['',Validators.required]
    });

  }


  
  ngOnInit() {
    this.loadData();
  }




  public loadData() {

    this.subclubService.getAllSubclubs().subscribe(
      (data)=>{
        console.log("Service data:", data);
        this.dataSource = data;
      },
      (error)=>{
        alert('Bir hata meydana geldi lütfen tekrar deneyiniz!');
      }
    );
}


deleteSubClub(id){

  
  this.subclubService.deleteById(id).subscribe(
    (data)=>{
      console.log("Service data:", data);
      this.loadData();

    },
    (error)=>{
      alert('Bir hata meydana geldi lütfen tekrar deneyiniz!');
    }
  );

}




closeResult = '';



open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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


openAdminList(content,subclubId){
  this.currentSubclubId = subclubId;
  this.getAdmin();
  this.getSubclubMemberList();

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    this.ngOnInit();

  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    this.ngOnInit();

  });
  


}

openFeedbackList(content,subclubId){
  this.currentSubclubId = subclubId;
  this.getFeedbacks();

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    this.ngOnInit();

  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    this.ngOnInit();

  });
  

}



getFeedbacks(){
  this.subclubService.getFeedbacksBySubclubId(this.currentSubclubId).subscribe(
    (data)=>{
      this.feedbackList = data;
    },
    (error)=>{
      alert('Bu kulüpte hiç üye bulunmamaktadır!');
    }
  );

}

deleteFeedbackById(feedbackId){
  this.subclubService.deleteFeedbackById(feedbackId).subscribe(
    (data)=>{
      alert('Feedback is deleted!');
      this.getFeedbacks();
    },
    (error)=>{
      alert('There is a problem! Please try again');
    }
  );

}



getSubclubMemberList(){
  this.subclubService.getMembersBySubclubId(this.currentSubclubId).subscribe(
    (data)=>{
      this.memberList = data;
    },
    (error)=>{
      alert('Bu kulüpte hiç üye bulunmamaktadır!');
    }
  );

}





assignAdmin(userId){
  this.subclubService.assignAdmin(this.currentSubclubId,userId).subscribe(
    (data)=>{
      alert('New admin is successfully assigned!');
    },
    (error)=>{
      alert('Bir hata meydana geldi lütfen tekrar deneyiniz!');
    }
  );
}

getAdmin(){

  this.subclubService.getAdmin(this.currentSubclubId).subscribe(
    (data)=>{
      this.currentAdmin = data;
    },
    (error)=>{
    }
  );

}

}
