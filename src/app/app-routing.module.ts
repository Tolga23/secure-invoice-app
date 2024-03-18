import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {VerifyComponent} from "./pages/verify/verify.component";
import {ResetpasswordComponent} from "./pages/resetpassword/resetpassword.component";
import {CustomerComponent} from "./pages/customer/customer.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {CustomersComponent} from "./pages/customers/customers.component";
import {HomeComponent} from "./pages/home/home.component";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {NewcustomerComponent} from "./pages/newcustomer/newcustomer.component";
import {InvoicesComponent} from "./pages/invoices/invoices.component";
import {InvoiceComponent} from "./pages/invoice/invoice.component";
import {NewinvoiceComponent} from "./pages/newinvoice/newinvoice.component";


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "resetpassword", component: ResetpasswordComponent},
  {path: "api/user/verify/account/:key", component: VerifyComponent},
  {path: "api/user/verify/password/:key", component: VerifyComponent},
  {path: "profile", component: ProfileComponent, canActivate: [AuthenticationGuard]},
  {path: "customers", component: CustomersComponent, canActivate: [AuthenticationGuard]},
  {path: "customer/:id", component: CustomerComponent, canActivate: [AuthenticationGuard]},
  {path: "customers/new", component: NewcustomerComponent, canActivate: [AuthenticationGuard]},
  {path: "invoices", component: InvoicesComponent, canActivate: [AuthenticationGuard]},
  {path: "invoices/:id/:invoicesNumber", component: InvoiceComponent, canActivate: [AuthenticationGuard]},
  {path: "invoices/new", component: NewinvoiceComponent, canActivate: [AuthenticationGuard]},
  {path: "", component: HomeComponent, canActivate: [AuthenticationGuard]},
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
