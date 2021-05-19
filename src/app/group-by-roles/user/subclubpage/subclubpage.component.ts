import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageDto } from 'src/app/entity/messagedto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MessageService } from 'src/app/services/messageservice';
import { MessageHistoryDto } from 'src/app/entity/MessageHistoryDto';
import { TokenDto } from 'src/app/entity/tokendto';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { User } from 'src/app/entity/user';
import { SubclubService } from 'src/app/services/subclubservice';
import { Announcement } from 'src/app/entity/announcement';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

declare var $: any;


@Component({
  selector: 'app-subclubpage',
  templateUrl: './subclubpage.component.html',
  styleUrls: ['./subclubpage.component.css']
})
export class SubclubpageComponent implements OnInit {


  previousKeyword: string = null;


  term: string;

  
  message: MessageDto;
  announcements:Announcement[];
  announcementForm: FormGroup;


  messageForm: FormGroup;
  messageHistory: MessageHistoryDto[];


  currentUser: TokenDto;
  subclubId;
  subclubMembers: User[];
  subclubAdmin:User;

  loading = false;
  submitted = false;
  error = '';



  constructor(private router: Router,private messageservice:MessageService, private subclubService: SubclubService,
    private formBuilder: FormBuilder, private authenticationService: AuthenticationService, 
    private route: ActivatedRoute,private modalService: NgbModal) {
    
    this.subclubId = this.route.snapshot.paramMap.get('subClubId');

    

   }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      content: ['', Validators.required]
    });

    this.announcementForm = this.formBuilder.group({
      headline: [''],
      content:[''], 
    });

    
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getMessageHistory();
    this.getMembers();
    this.getAnnouncements();
    this.getAdmin();

  }


  public sendMessage(){
    if (this.messageForm.invalid) {
        // stop here if it's invalid
        alert('Invalid input');
        return;
    }
    


    this.messageservice.sendMessage(this.messageForm.getRawValue(),this.subclubId)
    .pipe()
    .subscribe(
      data => {
        this.ngOnInit();
        
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  
  }
  


getMessageHistory = ()=>{
  this.messageservice.getChatMessagesBySubclubId(this.subclubId).subscribe(
    (data)=>{
      this.messageHistory = data;
      console.log("Mesajlar: ", this.messageHistory);
    },
    (error)=>{
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





isMyMessage(msg:MessageHistoryDto): boolean {
  return msg.user.username === this.currentUser.username;
}


getAdmin(){
  this.subclubService.getAdmin(this.subclubId).subscribe(
    (data)=>{
      this.subclubAdmin = data;
    },
    (error)=>{
    }
  );
}


isSubclubAdmin(): boolean {
  console.log("subclub admin",this.subclubAdmin.username, "kullanici: ",this.currentUser.username)
  return this.subclubAdmin.username === this.currentUser.username;
}



getMembers(){

  this.subclubService.getMembersBySubclubId(this.subclubId).subscribe(
    (data)=>{
      this.subclubMembers = data;
      console.log("Members: ", this.subclubMembers);
    },
    (error)=>{
    }
  );

}


getAnnouncements = ()=>{
  this.subclubService.getAllAnnouncements(this.subclubId).subscribe(
    (data)=>{
      this.announcements = data;
      console.log("Mesajlar: ", this.messageHistory);
    },
    (error)=>{
    }
  );
}



saveAnnouncement(){
  if (this.announcementForm.invalid) {
      // stop here if it's invalid
      alert('Invalid input');
      return;
  }
  this.subclubService.saveAnnouncement(this.announcementForm.getRawValue(), this.subclubId)
  .pipe()
  .subscribe(
    data => {
      this.getAnnouncements();
      
    },
    error => {
      this.error = error;
      this.loading = false;
    });

}


}