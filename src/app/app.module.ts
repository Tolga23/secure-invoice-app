import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {AuthModule} from "./pages/auth/auth.module";
import {CustomerModule} from "./pages/customer/customer.module";
import {HomeModule} from "./pages/home/home.module";
import {InvoiceModule} from "./pages/invoice/invoice.module";
import {UserModule} from "./pages/profile/user.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    CustomerModule,
    InvoiceModule,
    UserModule,
    HomeModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
