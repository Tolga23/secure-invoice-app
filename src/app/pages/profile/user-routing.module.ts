import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user/user.component";
import {AuthenticationGuard} from "../../guard/authentication.guard";


const userRoutes: Routes = [
  {path: "profile", component: UserComponent, canActivate: [AuthenticationGuard]},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(userRoutes),
  ]
})
export class UserRoutingModule {
}
