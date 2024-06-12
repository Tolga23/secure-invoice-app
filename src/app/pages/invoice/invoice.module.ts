import {NgModule} from '@angular/core';
import {InvoicesComponent} from "./invoices/invoices.component";
import {SharedModule} from "../../shared/shared.module";
import {InvoiceDetailComponent} from "./invoice-detail/invoice-detail.component";
import {NewinvoiceComponent} from "./newinvoice/newinvoice.component";
import {InvoiceRoutingModule} from "./invoice-routing.module";


@NgModule({
  declarations: [
    InvoiceDetailComponent, InvoicesComponent, NewinvoiceComponent
  ],
  imports: [
    SharedModule, InvoiceRoutingModule
  ]
})
export class InvoiceModule {
}
