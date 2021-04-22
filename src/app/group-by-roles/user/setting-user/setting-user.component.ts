import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile } from 'src/app/common/user-profile';
import { UserService } from 'src/app/services/user.service';
import {AuthenticationService} from "../../../services/security/authentication.service";
import { User } from 'src/app/entity/user';
import { TokenDto } from 'src/app/entity/tokendto';

@Component({
  selector: 'app-setting-user',
  templateUrl: './setting-user.component.html',
  styleUrls: ['./setting-user.component.css']
})
export class SettingUserComponent implements OnInit {

  userForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  currentUser: TokenDto;
  current = User;
  currentUsername:string;
  url = '';

  constructor(private formBuilder: FormBuilder, //Reactive form'un form builder'Ä±
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService,
    private authenticationService: AuthenticationService
    ) 
    
    {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.currentUsername =this.currentUser.username;
      this.userForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
        
      });
      this.retrieveUserData();
  }

  ngOnInit(): void {
    
  }


  public clickSubmitProfile(): void {
    if (this.userForm.invalid) {
        // stop here if it's invalid
        alert('Invalid input');
        return;
    }
    this.userService.updateUserData(this.userForm.getRawValue(),this.currentUsername)
        .subscribe((): void => {
            alert('Saved!');
        });
}



private retrieveUserData(): void {
  console.log("isim: ",this.currentUsername);
  this.userService.getUserData(this.currentUsername)
      .subscribe((res: User) => {
        
          this.userForm.patchValue(res);
      });
}

}
