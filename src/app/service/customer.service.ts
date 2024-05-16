import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, tap, throwError} from "rxjs";
import {CustomHttpResponse} from "../interface/customhttpresponse";
import {Page} from "../interface/page";
import {User} from "../interface/user";
import {Stats} from "../interface/stats";
import {Customer} from "../interface/customer";
import {Customerstate} from "../interface/customerstate";
import {Invoice} from "../interface/invoice";


@Injectable({providedIn: 'root'})
export class CustomerService {
  private readonly baseUrl: string = 'http://localhost:8080/customer'

  constructor(private http: HttpClient) {
  }

  getCustomers$ = (page: number = 0) => <Observable<CustomHttpResponse<Page<Customer> & User & Stats>>>
    this.http.get<CustomHttpResponse<Page<Customer> & User & Stats>>(`${this.baseUrl}/list?page=${page}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  customer$ = (customerId: number) => <Observable<CustomHttpResponse<Customerstate>>>
    this.http.get<CustomHttpResponse<Customerstate>>(`${this.baseUrl}/get/${customerId}`)
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

  updateCustomer$ = (customer: Customer) => <Observable<CustomHttpResponse<Customerstate>>>
    this.http.put<CustomHttpResponse<Customerstate>>
    (`${this.baseUrl}/update`, customer)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  searchCustomer$ = (name: string = '', page: number = 0) => <Observable<CustomHttpResponse<Page<Customer> & User>>>
    this.http.get<CustomHttpResponse<Page<Customer> & User>>
    (`${this.baseUrl}/search?name=${name}&page=${page}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  getInvoicesCustomer$ = () => <Observable<CustomHttpResponse<Customer[] & User>>>
    this.http.get<CustomHttpResponse<Customer[] & User>>
    (`${this.baseUrl}/invoice/new`,)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  createInvoices$ = (customerId: number, invoice: Invoice) => <Observable<CustomHttpResponse<Customer[] & User>>>
    this.http.post<CustomHttpResponse<Customer[] & User>>
    (`${this.baseUrl}/invoice/add/${customerId}`, invoice)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  invoices$ = (page: number = 0) => <Observable<CustomHttpResponse<Page<Invoice> & User & Stats>>>
    this.http.get<CustomHttpResponse<Page<Invoice> & User & Stats>>
    (`${this.baseUrl}/invoice/list?page=${page}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  invoice$ = (invoiceId: number) => <Observable<CustomHttpResponse<Customer & Invoice & User>>>
    this.http.get<CustomHttpResponse<Customer & Invoice & User>>
    (`${this.baseUrl}/invoice/get/${invoiceId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  downloadReport$ = () => <Observable<HttpEvent<Blob>>>
    this.http.get(`${this.baseUrl}/download/report`, {reportProgress: true, observe: 'events', responseType: 'blob'})
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
        errorMessage = `An error occurred - Error status ${error.status}, error message is: ${error.error.message}` + error.message
        console.log(errorMessage)
      }
    }

    return throwError(() => error.error.message || `An error occurred - Error status ${error.status}`)
  }


}
