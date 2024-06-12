import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ResetPasswordComponent} from "./resetpassword/reset-password.component";
import {VerifyComponent} from "./verify/verify.component";

const authRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "resetpassword", component: ResetPasswordComponent},
  {path: "api/user/verify/account/:key", component: VerifyComponent},
  {path: "api/user/verify/password/:key", component: VerifyComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(authRoutes),
  ]
})
export class AuthRoutingModule {
}
