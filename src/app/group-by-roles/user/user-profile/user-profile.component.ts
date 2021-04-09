import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfile } from 'src/app/common/user-profile';
import { UserService } from 'src/app/services/user.service';

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


  constructor(private formBuilder: FormBuilder, //Reactive form'un form builder'ı
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService) {

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
    this.userService.updateUserProfile(this.profileForm.getRawValue())
        .subscribe((): void => {
            alert('Saved!');
        });
}


  private retrieveData(): void {
    this.userService.getProfile("eren")
        .subscribe((res: UserProfile) => {
            // Assuming res has a structure like:
            // res = {
            //     field1: "some-string",
            //     field2: "other-string",
            //     subgroupName: {
            //         subfield2: "another-string"
            //     },
            // }
            // Values in res that don't line up to the form structure
            // are discarded. You can also pass in your own object you
            // construct ad-hoc.
            this.profileForm.patchValue(res);
        });
}



}
