import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageDto } from 'src/app/entity/messagedto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MessageService } from 'src/app/services/messageservice';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: MessageDto;
  messageForm;
  constructor(private router: Router,private messageservice:MessageService,private formBuilder: FormBuilder) {
    this.messageForm = {
      content: 'hello'
      
    };

    
   }

  ngOnInit(): void {
  }

  send(){
    console.log(this.messageForm.content.trim());
    this.messageservice.sendMessage(this.message);
    
  }


  

}
