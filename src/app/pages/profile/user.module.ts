import {NgModule} from '@angular/core';
import {UserComponent} from "./user/user.component";
import {SharedModule} from "../../shared/shared.module";
import {UserRoutingModule} from "./user-routing.module";
import {NavbarModule} from "../navbar/navbar.module";

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    SharedModule, UserRoutingModule, NavbarModule
  ]
})
export class UserModule {
}
