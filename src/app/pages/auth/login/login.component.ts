import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {NgForm} from "@angular/forms";
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {LoginState} from "../../../interface/appstates";
import {DataState} from "../../../enum/datastate.enum";
import {Key} from "../../../enum/key.enum";
import {NotificationService} from "../../../service/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit{
  loginState$: Observable<LoginState> = of({dataState: DataState.LOADED})
  private phoneSubject = new BehaviorSubject<string | null>(null)
  private emailSubject = new BehaviorSubject<string | null>(null)
  readonly DataState = DataState

  constructor(private router: Router, private userService: UserService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
        this.userService.isAuthenticated() ? this.router.navigate(['/']) : this.loginPage()
    }

  login(loginForm: NgForm): void {
    this.loginState$ = this.userService.login$(loginForm.value.email, loginForm.value.password)
      .pipe(map(response => {
          if (response.data.user.usingAuth) {
            this.notificationService.onDefault(response.message)
            this.emailSubject.next(response.data.user.email)
            this.phoneSubject.next(response.data.user.phone)
            return {
              dataState: DataState.LOADED, usingAuth: true, loginSuccess: false,
              phone: response.data.user.phone.substring(response.data.user.phone.length - 4)
            }
          } else {
            this.notificationService.onDefault(response.message)
            localStorage.setItem(Key.TOKEN, response.data.access_token)
            localStorage.setItem(Key.REFRESH_TOKEN, response.data.refresh_token)
            this.router.navigateByUrl('/')
            return {dataState: DataState.LOADED, loginSuccess: true}
          }
        }),
        startWith({dataState: DataState.LOADING, usingAuth: false}),
        catchError((error: string) => {
          this.notificationService.onError(error)
          return of({dataState: DataState.ERROR, usingAuth: false, loginSuccess: false, error})
        })
      )
  }

  verifyCode(verifyCodeForm: NgForm): void {
    this.loginState$ = this.userService.verifyCode$(this.emailSubject.value, verifyCodeForm.value.code)
      .pipe(
        map(response => {
          localStorage.setItem(Key.TOKEN, response.data.access_token)
          localStorage.setItem(Key.REFRESH_TOKEN, response.data.refresh_token)
          this.router.navigateByUrl('')
          return {dataState: DataState.LOADED, loginSuccess: true}
        }),
        startWith({
          dataState: DataState.LOADING, usingAuth: true, loginSuccess: false,
          phone: this.phoneSubject.value.substring(this.phoneSubject.value.length - 4)
        }),
        catchError((error: string) => {
            return of({
              dataState: DataState.ERROR, usingAuth: true, loginSuccess: false, error,
              phone: this.phoneSubject.value.substring(this.phoneSubject.value.length - 4)
            })
          }
        )
      )
  }


  loginPage() {
    this.loginState$ = of({dataState: DataState.LOADED})
  }
}
