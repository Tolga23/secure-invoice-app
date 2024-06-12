import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {DataState} from "../../../enum/datastate.enum";
import {State} from "../../../interface/state";
import {CustomHttpResponse} from "../../../interface/customhttpresponse";
import {Profile} from "../../../interface/profile";
import {NgForm} from "@angular/forms";
import {EventType} from "../../../enum/EventType";

@Component({
  selector: 'app-profile',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  profileState$: Observable<State<CustomHttpResponse<Profile>>>
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null)
  private isLoadingSubject = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoadingSubject.asObservable()
  private showLogsSubject = new BehaviorSubject<boolean>(false)
  showLogs$ = this.showLogsSubject.asObservable()
  readonly DataState = DataState
  readonly EventType = EventType

  constructor(private router: Router, private userService: UserService) {
  }


  /**
   * ngOnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * Here, it is used to initialize the profileState$ observable.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.profileState$ = this.userService.profile$()
      .pipe(
        map(response => {
          console.log(response)
          console.log(response.data.roles)
          this.dataSubject.next(response)
          return {dataState: DataState.LOADED, appData: response}
        }),
        startWith({dataState: DataState.LOADING}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR, appData: this.dataSubject.value, error})
        })
      )
  }

  updateProfile(profileForm: NgForm): void {
    // isLoadingSubject is used to show a loading spinner while the request is being processed.
    this.isLoadingSubject.next(true)
    this.profileState$ = this.userService.updateProfile$(profileForm.value)
      .pipe(
        map(response => {
          console.log(response)
          this.dataSubject.next({...response, data: response.data})
          this.isLoadingSubject.next(false)
          return {dataState: DataState.LOADED, appData: this.dataSubject.value}
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.isLoadingSubject.next(false)
          return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
        })
      )
  }

  updateRole(roleForm: NgForm): void {
    this.isLoadingSubject.next(true);
    this.profileState$ = this.userService.updateRoles$(roleForm.value.roleName)
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next({...response, data: response.data});
          this.isLoadingSubject.next(false);
          return {dataState: DataState.LOADED, appData: this.dataSubject.value};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.isLoadingSubject.next(false);
          return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
        })
      )
  }

  updatePassword(passwordForm: NgForm): void {
    this.isLoadingSubject.next(true)
    if (passwordForm.value.newPassword === passwordForm.value.confirmPassword) {
      this.profileState$ = this.userService.updatePassword$(passwordForm.value)
        .pipe(
          map(response => {
            console.log(response)
            this.dataSubject.next({...response, data: response.data})
            passwordForm.reset()
            this.isLoadingSubject.next(false)
            return {dataState: DataState.LOADED, appData: this.dataSubject.value}
          }),
          startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
          catchError((error: string) => {
            this.isLoadingSubject.next(false)
            return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
          })
        )
    } else {
      passwordForm.reset();
      this.isLoadingSubject.next(false)
    }
  }

  updateAccountSettings(settingsForm: NgForm): void {
    this.isLoadingSubject.next(true)
    this.profileState$ = this.userService.updateAccountSettings$(settingsForm.value)
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next({...response, data: response.data});
          this.isLoadingSubject.next(false);
          return {dataState: DataState.LOADED, appData: this.dataSubject.value};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.isLoadingSubject.next(false);
          return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
        })
      )
  }

  toggleTwoFactorVerification(): void {
    this.isLoadingSubject.next(true)
    this.profileState$ = this.userService.toggleTwoFactorVerification$()
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next({...response, data: response.data});
          this.isLoadingSubject.next(false);
          return {dataState: DataState.LOADED, appData: this.dataSubject.value};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.isLoadingSubject.next(false);
          return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
        })
      )
  }

  /**
   * This method is used to update the user's profile image.
   * It first checks if an image file is provided. If not, it does nothing.
   * If an image file is provided, it sets the isLoadingSubject to true to indicate that a request is being processed.
   * It then calls the updateImage$ method of the userService with the FormData object created from the image file.
   * The response from the updateImage$ method is then processed in the map operator.
   * The imageUrl of the user in the response data is updated to force the browser to reload the image.
   * The isLoadingSubject is then set to false to indicate that the request has been processed.
   * If an error occurs during the process, the catchError operator is used to handle the error and the isLoadingSubject is set to false.
   *
   * @param {File} image - The image file that needs to be uploaded.
   * @returns {void}
   */
  updateImage(image: File): void {
    if (image) {
      this.isLoadingSubject.next(true)
      this.profileState$ = this.userService.updateImage$(this.getFormData(image))
        .pipe(
          map(response => {
            console.log(response)
            /** A query parameter is added to the imageUrl with the current time to ensure that the URL is unique and not cached by the browser.*/
            this.dataSubject.next({
              ...response,
              data: {
                ...response.data,
                user: {...response.data.user, imageUrl: `${response.data.user.imageUrl}?time=${new Date().getTime()}`}
              }
            })
            this.isLoadingSubject.next(false)
            return {dataState: DataState.LOADED, appData: this.dataSubject.value}
          }),
          startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
          catchError((error: string) => {
            this.isLoadingSubject.next(false)
            return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
          })
        )
    }
  }

  toggleLogs(): void {
    this.showLogsSubject.next(!this.showLogsSubject.value)
  }

  /**
   * This method is used to create a FormData object and append an image file to it.
   * FormData is a key-value pair data structure where the key is the name of the field and the value is the file data.
   * This method is particularly useful when you want to send a file via an HTTP request.
   *
   * @param {File} image - The image file that needs to be appended to the FormData object.
   * @returns {FormData} - Returns a FormData object with the image file appended to it.
   */
  private getFormData(image: File) {
    const formData = new FormData()
    // The key 'image' is need to be same as the name of the field in the backend.
    formData.append('image', image)
    return formData
  }
}

