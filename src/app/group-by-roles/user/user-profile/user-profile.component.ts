import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile } from 'src/app/common/user-profile';
import { UserService } from 'src/app/services/user.service';
import {AuthenticationService} from "../../../services/security/authentication.service";
import { TokenDto } from 'src/app/entity/tokendto';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
 //https://stackoverflow.com/questions/51342775/how-can-i-bind-a-form-to-a-model-in-angular-6-using-reactive-forms
  profileForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  currentUser: TokenDto;
  currentUsername:string;

  constructor(private formBuilder: FormBuilder, //Reactive form'un form builder'ı
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService,
    private authenticationService: AuthenticationService
    ) 
    
    {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.currentUsername =this.currentUser.username;
      this.profileForm = this.formBuilder.group({
        about: ['', Validators.required],
        city: ['', Validators.required],
        hobbies: ['', Validators.required],
        phone: ['', Validators.required]
        
      });
      this.retrieveData();
  }

  ngOnInit(): void {
    
  }


  public onClickSubmit(): void {
    if (this.profileForm.invalid) {
        // stop here if it's invalid
        alert('Invalid input');
        return;
    }
    this.userService.updateUserProfile(this.profileForm.getRawValue(),this.currentUsername)
        .subscribe((): void => {
            alert('Saved!');
        });
}


  private retrieveData(): void {
    console.log("isim: ",this.currentUsername);
    this.userService.getProfile(this.currentUsername)
        .subscribe((res: UserProfile) => {
            this.profileForm.patchValue(res);
        });
}



}
