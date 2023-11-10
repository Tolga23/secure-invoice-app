import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {VerifyComponent} from "./pages/verify/verify.component";
import {ResetpasswordComponent} from "./pages/resetpassword/resetpassword.component";


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "resetpassword", component: ResetpasswordComponent},
  {path: "api/user/verify/account/:key", component: VerifyComponent},
  {path: "api/user/verify/password/:key", component: VerifyComponent},
  {path: "**", component: LoginComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule {
}
