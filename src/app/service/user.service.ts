import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {CustomHttpResponse} from "../interface/customhttpresponse";
import {Profile} from "../interface/profile";
import {User} from "../interface/user";
import {Key} from "../enum/key.enum";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl: string = 'http://localhost:8080/api/user'
  private jwtHelper = new JwtHelperService()

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

  register$ = (user: User) => <Observable<CustomHttpResponse<Profile>>>
    this.http.post<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/register`, user)
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
      );
  
  updateRoles$ = (roleName: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/update/role/${roleName}`, {})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  /**
   * This method is used to update the account settings of a user.
   * It sends a PATCH request to the '/update/settings' endpoint with the user's new settings.
   *
   * @param {Object} settings - The new settings of the user.
   * @param {boolean} settings.enable - The new enable status of the user.
   * @param {boolean} settings.isNotLocked - The new lock status of the user.
   *
   * @returns {Observable<CustomHttpResponse<Profile>>} An Observable that will emit the server's response.
   * The response is expected to be of type `CustomHttpResponse<Profile>`.
   */
  updateAccountSettings$ = (settings: { enable: boolean, isNotLocked: boolean }) => {
    return <Observable<CustomHttpResponse<Profile>>>
      this.http.patch<CustomHttpResponse<Profile>>
      (`${this.baseUrl}/update/settings`, settings)
        .pipe(
          tap(console.log),
          catchError(this.handleError)
        );
  };

  /**
   * This method is used to toggle the two-factor verification setting for the user's account.
   * It sends a PATCH request to the '/update/2fa' endpoint.
   *
   * @returns {Observable<CustomHttpResponse<Profile>>} An Observable that will emit the server's response.
   * The response is expected to be of type `CustomHttpResponse<Profile>`.
   */
  toggleTwoFactorVerification$ = () => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/update/2fa`, {})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  /**
   * This method is used to update the profile image of a user.
   * It sends a PATCH request to the '/update/image' endpoint with the new image as FormData.
   *
   * @param {FormData} formData - The new image of the user as FormData.
   *
   * @returns {Observable<CustomHttpResponse<Profile>>} An Observable that will emit the server's response.
   */
  updateImage$ = (formData: FormData) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${this.baseUrl}/update/image`, formData)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  /**
   * Checks if the user is authenticated.
   *
   * This method uses the JwtHelperService to decode the JWT token stored in the local storage and check its expiry.
   * If the token is present, valid, and not expired, the method returns true, indicating that the user is authenticated.
   *
   * @returns {boolean} - Returns true if the user is authenticated, false otherwise.
   */
  isAuthenticated = (): boolean =>
    (this.jwtHelper.decodeToken<string>(localStorage.getItem(Key.TOKEN))
      && !this.jwtHelper.isTokenExpired(localStorage.getItem(Key.TOKEN)))

  logout(): void {
    localStorage.removeItem(Key.TOKEN)
    localStorage.removeItem(Key.REFRESH_TOKEN)
  }


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
