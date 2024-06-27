import {ChangeDetectionStrategy, Component} from '@angular/core';
import {catchError, map, Observable, of, pipe, startWith} from "rxjs";
import {DataState} from "../../../enum/datastate.enum";
import {UserService} from "../../../service/user.service";
import {NgForm} from "@angular/forms";
import {ResetPassword} from "../../../interface/ResetPassword";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {
  resetPasswordState$: Observable<ResetPassword> = of({dataState: DataState.LOADED})
  readonly DataState = DataState

  constructor(private userService: UserService) {
  }

  resetPasswordByEmail(resetPasswordForm: NgForm): void {
    this.resetPasswordState$ = this.userService.resetPasswordByMail$(resetPasswordForm.value.email)
      .pipe(
        map(response => {
          resetPasswordForm.reset();
          return {dataState: DataState.LOADED, resetPasswordSuccess: true, message: response.message}
        }),
        startWith({dataState: DataState.LOADING, resetPasswordSuccess: false}),
        catchError((error: string) => {
          return of({
            dataState: DataState.ERROR, resetPasswordSuccess: false, error
          })
        })
      );
  }
}
