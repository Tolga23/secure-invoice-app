import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, switchMap, throwError} from 'rxjs';
import {Key} from "../enum/key.enum";
import {UserService} from "../service/user.service";
import {CustomHttpResponse} from "../interface/customhttpresponse";
import {Profile} from "../interface/profile";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isTokenRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<CustomHttpResponse<Profile>> = new BehaviorSubject(null)
  constructor(private userService: UserService) {
  }

  // This method intercepts HTTP requests and modifies them before they are sent.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> | Observable<HttpResponse<unknown>> {
    // If the request URL includes 'login', 'register', 'verify', 'resetpassword', or 'refresh',
    // the request is forwarded without any modifications.
    if (request.url.includes('login') || request.url.includes('register') || request.url.includes('verify')
      || request.url.includes('resetpassword') || request.url.includes('refresh')) {
      return next.handle(request);
    }
    // If the request URL does not include any of the above strings,
    // an authentication token is added to the request headers.
    // The token is retrieved from the local storage.
    return next.handle(this.addAuthorizationTokenHeader(request, localStorage.getItem(Key.TOKEN)))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse && error.status === 401 && error.error.message.includes('expired')) {
            return this.handleRefreshToken(request, next);
          } else {
            return throwError(() => error);
          }
        })
      );
  }


  private handleRefreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isTokenRefreshing) {
      console.log('Refreshing Token...');
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.userService.refreshToken$().pipe(
        switchMap((response) => {
          console.log('Token Refresh Response:', response);
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(response);
          console.log('New Token:', response.data.access_token);
          console.log('Sending original request:', request);
          return next.handle(this.addAuthorizationTokenHeader(request, response.data.access_token))
        })
      );
    } else {
      this.refreshTokenSubject.pipe(
        switchMap((response) => {
          return next.handle(this.addAuthorizationTokenHeader(request, response.data.access_token))
        })
      )
    }
  }

  private addAuthorizationTokenHeader(request: HttpRequest<unknown>, token: string): HttpRequest<any> {
    return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }
}
