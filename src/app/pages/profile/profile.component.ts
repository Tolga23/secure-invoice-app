import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {DataState} from "../../enum/datastate.enum";
import {State} from "../../interface/state";
import {CustomHttpResponse} from "../../interface/customhttpresponse";
import {Profile} from "../../interface/profile";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileState$: Observable<State<CustomHttpResponse<Profile>>>
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null)
  private isLoadingSubject = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoadingSubject.asObservable()
  readonly DataState = DataState

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

}

