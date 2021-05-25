import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from "../../services/security/authentication.service";
import { MustMatch } from '../../helpers/must-match.validator';
import {MatButtonModule} from '@angular/material/button';
import { ResponseMessage } from 'src/app/entity/responseMessage';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  response:ResponseMessage;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName:['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required], //E-mail ile dogrulamayı daha sonra eklemeyi unutma: https://blog.mailtrap.io/angular-email-validation/
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
    this.authenticationService.logout();
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.authenticationService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.response = data;
          if(this.response.responseType===0){
              alert(this.response.responseMessage);
          }
          else{
            alert(this.response.responseMessage);
            this.router.navigate(['/login']);
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}