import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { CustomerComponent } from './pages/customer/customer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { StatsComponent } from './pages/stats/stats.component';
import {TokenInterceptor} from "./interceptor/token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    VerifyComponent,
    RegisterComponent,
    LoginComponent,
    ResetpasswordComponent,
    CustomerComponent,
    ProfileComponent,
    HomeComponent,
    CustomersComponent,
    NavbarComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
