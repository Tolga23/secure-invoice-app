import {Injectable} from "@angular/core";
import {HttpResponse} from "@angular/common/http";

@Injectable()
export class HttpCacheService {
  private httpResponseCache: { [key: string]: HttpResponse<any> } = {};

  put = (key: string, httpResponse: HttpResponse<any>): void => {
    console.log('Caching response: ', httpResponse);
    this.httpResponseCache[key] = httpResponse;
  }

  get = (key: string): HttpResponse<any> | null | undefined => {
    console.log('Getting cached response key: ', key);
    return this.httpResponseCache[key];
  }

  evict = (key: string): boolean => delete this.httpResponseCache[key];

  evictAll = (): void => {
    console.log('Evicting all cache');
    this.httpResponseCache = {};
  }

  logCache = (): void => console.log('Cache: ', this.httpResponseCache);

}
