import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CustomersComponent} from "./customers/customers.component";
import {AuthenticationGuard} from "../../guard/authentication.guard";
import {CustomerDetailComponent} from "./customer-detail/customer-detail.component";
import {NewcustomerComponent} from "./newcustomer/newcustomer.component";

const customerRoute: Routes = [
  {path: "customers", component: CustomersComponent, canActivate: [AuthenticationGuard]},
  {path: "customer/:id", component: CustomerDetailComponent, canActivate: [AuthenticationGuard]},
  {path: "customers/new", component: NewcustomerComponent, canActivate: [AuthenticationGuard]},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(customerRoute),
  ]
})
export class CustomerRoutingModule {
}
