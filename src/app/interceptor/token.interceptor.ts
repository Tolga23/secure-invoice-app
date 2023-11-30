import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Key} from "../enum/key.enum";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {
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
    return next.handle(this.addAuthenticationTokenHeader(request, localStorage.getItem(Key.TOKEN)))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse && error.status === 401 && error.error.message.includes('expired')) {
            this.handleRefreshToken(request, next);
          } else {
            return throwError(() => error);
          }
        })
      )
  }

  private addAuthenticationTokenHeader(request: HttpRequest<unknown>, token: string): HttpRequest<any> {
    return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }

  private handleRefreshToken(request: HttpRequest<unknown>, next: HttpHandler) {
    
  }
}
