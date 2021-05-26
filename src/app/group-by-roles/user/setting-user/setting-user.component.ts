import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile } from 'src/app/common/user-profile';
import { UserService } from 'src/app/services/user.service';
import {AuthenticationService} from "../../../services/security/authentication.service";
import { User } from 'src/app/entity/user';
import { TokenDto } from 'src/app/entity/tokendto';
import { MustMatch } from '../../../helpers/must-match.validator';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-setting-user',
  templateUrl: './setting-user.component.html',
  styleUrls: ['./setting-user.component.css']
})
export class SettingUserComponent implements OnInit {

  passwordForm: FormGroup;
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
      this.passwordForm = this.formBuilder.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        newPasswordConfirmation: ['', Validators.required]
        
      }, {
        validator: MustMatch('newPassword', 'newPasswordConfirmation')
    });
      this.retrieveUserData();
  }

  ngOnInit(): void {
    
  }

  get f() {
    return this.passwordForm.controls;
  }

  public clickSubmitProfile(): void {
    if (this.passwordForm.invalid) {
        // stop here if it's invalid
        alert("Confirmation of New Password and New Password doesn't match!");
        return;
    }
    this.userService.updatePassword(this.passwordForm.getRawValue(),this.currentUsername)
    .pipe(first())
    .subscribe(
      data => {
        alert(data.responseMessage);
        
      },
      error => {
        this.error = error;
        this.loading = false;
      });
}





private retrieveUserData(): void {
  console.log("isim: ",this.currentUsername);
  this.userService.getUserData(this.currentUsername)
      .subscribe((res: User) => {
        
          this.passwordForm.patchValue(res);
      });
}

}
