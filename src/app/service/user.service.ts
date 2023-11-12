import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {CustomHttpResponse} from "../interface/customhttpresponse";
import {Profile} from "../interface/profile";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'http://localhost:8080/api/user'

  constructor(private http: HttpClient) {
  }

  login$ = (email: string, password: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.post<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/login`, {email, password})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  verifyCode$ = (email: string, code: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/verify/code/${email}/${code}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string

    if (error.error instanceof ErrorEvent) {
      errorMessage = `An client error occurred: ${error.error.message}`
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason
      } else {
        errorMessage = `An error occurred - Error status ${error.status}, error message is: ${error.message}`
      }
    }

    return throwError(() => error.error.message || `An error occurred - Error status ${error.status}`)
  }
}
