import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {HttpCacheService} from "../service/http.cache.service";
import {Observable, of, tap} from "rxjs";


@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private httpCache: HttpCacheService) {
  }

  /**
   * Intercepts HTTP requests and decides whether to handle them directly or pass them to the next handler in the chain.
   *
   * @param {HttpRequest<unknown>} request - The HttpRequest to be processed.
   * @param {HttpHandler} next - The next handler in the HTTP interceptor chain.
   * @returns {Observable<HttpEvent<unknown>> | Observable<HttpResponse<unknown>>} - An Observable that will emit the HTTP response from the server.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> | Observable<HttpResponse<unknown>> {
    // If the request URL includes certain requests, the request is forwarded without any modifications.
    if (request.url.includes('login') || request.url.includes('register') || request.url.includes('verify')
      || request.url.includes('resetpassword') || request.url.includes('refresh')) {
      return next.handle(request);
    }

    // If the request method is POST,PUT or DELETE or the URL includes 'download',
    // the cache is cleared and the request is passed to the next handler.
    if (request.method !== 'GET' || request.url.includes('download')) {
      this.httpCache.evictAll();
      return next.handle(request);
    }

    // check if the cached response exists
    const cachedResponse: HttpResponse<any> = this.httpCache.get(request.url);
    // If the cached response exists, it is returned as an Observable.
    if (cachedResponse) {
      console.log('Returning cached response', cachedResponse);
      this.httpCache.logCache();
      return of(cachedResponse);
    }
    return this.handleRequestCache(request, next);
  }

  /**
   * Handles the request and caches the response if it is an instance of HttpResponse and the request method is not 'DELETE'.
   *
   * It is called when a 'GET' request does not have a cached response.
   *
   * @param {HttpRequest<any>} request - The outgoing HTTP request.
   * @param {HttpHandler} next - The next handler in the HTTP interceptor chain.
   * @returns {Observable<HttpEvent<any>>} - An Observable that will emit the HTTP response from the server.
   */
  private handleRequestCache(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(response => {
          if (response instanceof HttpResponse && request.method !== 'DELETE') {
            console.log('Caching response', response);
            this.httpCache.put(request.url, response);
            this.httpCache.logCache();
          }
        })
      );
  }
}
