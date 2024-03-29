import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, tap, throwError} from "rxjs";
import {CustomHttpResponse} from "../interface/customhttpresponse";
import {Page} from "../interface/page";
import {User} from "../interface/user";
import {Stats} from "../interface/stats";
import {Customer} from "../interface/customer";


@Injectable({providedIn: 'root'})
export class CustomerService {
  private readonly baseUrl: string = 'http://localhost:8080/customer'

  constructor(private http: HttpClient) {
  }

  getCustomers$ = (page: number = 0) => <Observable<CustomHttpResponse<Page & User & Stats>>>
    this.http.get<CustomHttpResponse<Page & User & Stats>>(`${this.baseUrl}/list?page=${page}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  newCustomer$ = (customer: Customer) => <Observable<CustomHttpResponse<Customer & User>>>
    this.http.post<CustomHttpResponse<Customer & User>>
    (`${this.baseUrl}/create`, customer)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  searchCustomer$ = (name: string = '', page: number = 0) => <Observable<CustomHttpResponse<Page & User>>>
    this.http.get<CustomHttpResponse<Page & User>>
    (`${this.baseUrl}/search?name=${name}&page=${page}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string

    if (error.error instanceof ErrorEvent) {
      errorMessage = `An client error occurred: ${error.error.message}`
      console.log(errorMessage)
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason
        console.log(errorMessage)
      } else {
        errorMessage = `An error occurred - Error status ${error.status}, error message is: ${error.error.message}`
        console.log(errorMessage)
      }
    }

    return throwError(() => error.error.message || `An error occurred - Error status ${error.status}`)
  }

}
