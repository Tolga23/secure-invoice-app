import {ChangeDetectionStrategy, Component} from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {RegisterState} from "../../../interface/registerstate";
import {DataState} from "../../../enum/datastate.enum";
import {UserService} from "../../../service/user.service";
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../../service/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  registerState$: Observable<RegisterState> = of({dataState: DataState.LOADED})
  readonly DataState = DataState

  constructor(private userService: UserService, private notificationService: NotificationService) {
  }

  register(registerForm: NgForm): void {
    this.registerState$ = this.userService.register$(registerForm.value)
      .pipe(map(response => {
          this.notificationService.onSuccess(response.message)
          registerForm.reset()
          return {dataState: DataState.LOADED, registerSuccess: true, message: response.message}
        }),
        startWith({dataState: DataState.LOADING, registerSuccess: false}),
        catchError((error: string) => {
          this.notificationService.onError(error)
          return of({ dataState: DataState.ERROR, registerSuccess: false, error })
        })
      )
  }

  createAccountForm() {
    this.registerState$ = of({dataState: DataState.LOADED, registerSuccess: false})
  }
}
