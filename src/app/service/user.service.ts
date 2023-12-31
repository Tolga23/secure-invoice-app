import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {CustomHttpResponse} from "../interface/customhttpresponse";
import {Profile} from "../interface/profile";
import {User} from "../interface/user";
import {Key} from "../enum/key.enum";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl: string = 'http://localhost:8080/api/user'

  constructor(private http: HttpClient) {
  }

  /**
   * This method is used to authenticate a user.
   * It sends a POST request to the '/login' endpoint with the user's email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   *
   * @returns {Observable<CustomHttpResponse<Profile>>} An Observable that will emit the server's response.
   * The response is expected to be of type `CustomHttpResponse<Profile>`.
   */
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

  profile$ = () => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/profile`,)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  refreshToken$ = () => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/refresh/token`, {headers: {Authorization: `Bearer ${localStorage.getItem(Key.REFRESH_TOKEN)}`}})
      .pipe(
        tap(response => {
          console.log(response);
          localStorage.removeItem(Key.TOKEN);
          localStorage.removeItem(Key.REFRESH_TOKEN);
          localStorage.setItem(Key.TOKEN, response.data.access_token);
          localStorage.setItem(Key.REFRESH_TOKEN, response.data.refresh_token);
        }),
        catchError(this.handleError)
      );


  updateProfile$ = (user: User) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/update`, user)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  updatePassword$ = (form: {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  }) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/update/password`, form)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string

    if (error.error instanceof ErrorEvent) {
      errorMessage = `An client error occurred: ${error.error.message}`
      console.log(errorMessage)
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason
        console.log(errorMessage)
      } else {
        errorMessage = `An error occurred - Error status ${error.status}, error message is: ${error.error.message}`
        console.log(errorMessage)
      }
    }

    return throwError(() => error.error.message || `An error occurred - Error status ${error.status}`)
  }
}
