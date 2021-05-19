import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageDto } from 'src/app/entity/messagedto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MessageService } from 'src/app/services/messageservice';
import { MessageHistoryDto } from 'src/app/entity/MessageHistoryDto';
import { TokenDto } from 'src/app/entity/tokendto';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: MessageDto;

  messageForm: FormGroup;
  messageHistory: MessageHistoryDto[];
  currentUser: TokenDto;

  loading = false;
  submitted = false;
  error = '';

  constructor(private router: Router,private messageservice:MessageService,private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    
    
   }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      content: ['', Validators.required]
    });

    
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getMessageHistory();
  }


  public sendMessage(){
    if (this.messageForm.invalid) {
        // stop here if it's invalid
        alert('Invalid input');
        return;
    }
    
/*

    this.messageservice.sendMessage(this.messageForm.getRawValue())
    .pipe()
    .subscribe(
      data => {
        this.ngOnInit();
        
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  */
  }
  


getMessageHistory = ()=>{


  this.messageservice.getChatMessages(84).subscribe(
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



}
