import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {ProfileComponent} from './pages/profile/profile.component';
import {HomeComponent} from './pages/home/home/home.component';
import {NavbarComponent} from './pages/navbar/navbar.component';
import {StatsComponent} from './pages/stats/stats.component';
import {NgOptimizedImage} from "@angular/common";
import {NewinvoiceComponent} from './pages/newinvoice/newinvoice.component';
import {InvoicesComponent} from './pages/invoices/invoices.component';
import {InvoiceComponent} from './pages/invoice/invoice.component';
import {CoreModule} from "./core/core.module";
import {AuthModule} from "./pages/auth/auth.module";
import {CustomerModule} from "./pages/customer/customer.module";
import {HomeModule} from "./pages/home/home.module";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavbarComponent,
    StatsComponent,
    NewinvoiceComponent,
    InvoicesComponent,
    InvoiceComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgOptimizedImage,
    CoreModule,
    AuthModule,
    CustomerModule,
    HomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
