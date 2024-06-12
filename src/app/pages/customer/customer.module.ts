import {NgModule} from '@angular/core';
import {CustomersComponent} from "./customers/customers.component";
import {NewcustomerComponent} from "./newcustomer/newcustomer.component";
import {CustomerDetailComponent} from "./customer-detail/customer-detail.component";
import {SharedModule} from "../../shared/shared.module";
import {CustomerRoutingModule} from "./customer-routing.module";

@NgModule({
  declarations: [
    CustomersComponent, NewcustomerComponent, CustomerDetailComponent
  ],
  imports: [
    SharedModule, CustomerRoutingModule
  ]
})
export class CustomerModule {
}
