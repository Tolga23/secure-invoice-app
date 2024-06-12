import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home/home.component";
import {AuthenticationGuard} from "./guard/authentication.guard";


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: "**", component: HomeComponent, canActivate: [AuthenticationGuard]}];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule {
}
