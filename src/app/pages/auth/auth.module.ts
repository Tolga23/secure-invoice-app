import {NgModule} from '@angular/core';
import {VerifyComponent} from "./verify/verify.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ResetPasswordComponent} from "./resetpassword/reset-password.component";
import {SharedModule} from "../../shared/shared.module";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  declarations: [
    VerifyComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
  ],
  imports: [
    SharedModule, AuthRoutingModule
  ],
})
export class AuthModule {
}
