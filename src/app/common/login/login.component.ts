import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from "../../services/security/authentication.service";
import { TokenDto } from '../../entity/tokendto';
import { Role } from '../../entity/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  currentUser: TokenDto;


  constructor(private formBuilder: FormBuilder, //Reactive form'un form builder'ı
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
                this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], //Validators.required gerekli oldugunu belirti
      password: ['', Validators.required]
    });

    // Önce mevcut bir log durumu varsa onu bitiriyor (auth Service'deki logout aracılığıyla)
    this.authenticationService.logout();

    this.returnUrl = '/';

    if(this.currentUser !== null){
      if(this.currentUser.role === Role.User) {
        this.router.navigate(['/user']);
      }
      if(this.currentUser.role === Role.Admin) {
        this.router.navigate(['/admin']);
      }
    }

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  login() {    
    this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
          return;
        }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.role === Role.User) {
            this.router.navigate(['/user/home']);
          }
          if(data.role === Role.Admin) {
            this.router.navigate(['/admin']);
          }
        },
        error => {
          
          this.error = "Wrong Username or Password! Please try again";
          this.loading = false;
        });
    // event.preventDefault()
  }


}
