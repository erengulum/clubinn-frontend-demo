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


@Component({
  selector: 'app-subclubpage',
  templateUrl: './subclubpage.component.html',
  styleUrls: ['./subclubpage.component.css']
})
export class SubclubpageComponent implements OnInit {

  term: string;

  
  message: MessageDto;
  announcements:Announcement[];

  messageForm: FormGroup;
  messageHistory: MessageHistoryDto[];


  currentUser: TokenDto;
  subclubId;
  subclubMembers: User[];


  loading = false;
  submitted = false;
  error = '';

  constructor(private router: Router,private messageservice:MessageService, private subclubService: SubclubService,
    private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private route: ActivatedRoute) {
    
    this.subclubId = this.route.snapshot.paramMap.get('subClubId');

   }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      content: ['', Validators.required]
    });

    
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getMessageHistory();
    this.getMembers();
    this.getAnnouncements();
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




isMyMessage(msg:MessageHistoryDto): boolean {
  return msg.user.username === this.currentUser.username;
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


}
