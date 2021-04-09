import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  // Her request'e intercept edecek ve 401 alıp almadıgını kontrol edecek.401 aldıysan service'deki logout cagrılıyor ve oturum sona erer
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 403) { // eger token yoksa yani 401 yiyorsa logout yapıp login sayfasına yönlendirecek.
        this.authenticationService.logout(); // YETKIN YOK SAYFASI TASARLA LOGIN YERINE ORAYA GONDER
        this.router.navigate(['/login']);
        // this.router.navigate(['/unauthorized']);

      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
