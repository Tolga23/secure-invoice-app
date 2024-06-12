import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./pages/profile/profile.component";
import {HomeComponent} from "./pages/home/home/home.component";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {InvoicesComponent} from "./pages/invoices/invoices.component";
import {InvoiceComponent} from "./pages/invoice/invoice.component";
import {NewinvoiceComponent} from "./pages/newinvoice/newinvoice.component";


const routes: Routes = [
  {path: "profile", component: ProfileComponent, canActivate: [AuthenticationGuard]},
  {path: "invoices", component: InvoicesComponent, canActivate: [AuthenticationGuard]},
  {path: "invoices/:id/:invoicesNumber", component: InvoiceComponent, canActivate: [AuthenticationGuard]},
  {path: "invoices/new", component: NewinvoiceComponent, canActivate: [AuthenticationGuard]},
  {path: "", redirectTo: "/", pathMatch: "full"},
  {path: "**", component: HomeComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule {
}
