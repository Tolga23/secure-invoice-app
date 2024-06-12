import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {InvoicesComponent} from "./invoices/invoices.component";
import {AuthenticationGuard} from "../../guard/authentication.guard";
import {InvoiceDetailComponent} from "./invoice-detail/invoice-detail.component";
import {NewinvoiceComponent} from "./newinvoice/newinvoice.component";


const invoiceRoutes: Routes = [
  {path: "invoices", component: InvoicesComponent, canActivate: [AuthenticationGuard]},
  {path: "invoices/:id/:invoicesNumber", component: InvoiceDetailComponent, canActivate: [AuthenticationGuard]},
  {path: "invoices/new", component: NewinvoiceComponent, canActivate: [AuthenticationGuard]},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(invoiceRoutes),
  ]
})
export class InvoiceRoutingModule {
}
