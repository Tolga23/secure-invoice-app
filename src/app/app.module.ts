import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {CustomerComponent} from './pages/customer/customer.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {HomeComponent} from './pages/home/home.component';
import {CustomersComponent} from './pages/customers/customers.component';
import {NavbarComponent} from './pages/navbar/navbar.component';
import {StatsComponent} from './pages/stats/stats.component';
import {NgOptimizedImage} from "@angular/common";
import {NewcustomerComponent} from './pages/newcustomer/newcustomer.component';
import {NewinvoiceComponent} from './pages/newinvoice/newinvoice.component';
import {InvoicesComponent} from './pages/invoices/invoices.component';
import {InvoiceComponent} from './pages/invoice/invoice.component';
import {ExtractArrayValue} from './pipes/extractvalue.pipe';
import {CoreModule} from "./core/core.module";
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    ExtractArrayValue,
    AppComponent,
    CustomerComponent,
    ProfileComponent,
    HomeComponent,
    CustomersComponent,
    NavbarComponent,
    StatsComponent,
    NewcustomerComponent,
    NewinvoiceComponent,
    InvoicesComponent,
    InvoiceComponent,
    ExtractArrayValue
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgOptimizedImage,
    CoreModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
