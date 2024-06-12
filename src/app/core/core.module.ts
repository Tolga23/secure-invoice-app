import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "../interceptor/token.interceptor";
import {CacheInterceptor} from "../interceptor/cache.interceptor";
import {UserService} from "../service/user.service";
import {CustomerService} from "../service/customer.service";
import {HttpCacheService} from "../service/http.cache.service";


/**
 * The CoreModule is a module that dealing with the services and interceptors of the application.
 **/
@NgModule({
  providers: [
    UserService, CustomerService, HttpCacheService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true}
  ]
})
export class CoreModule {
}
