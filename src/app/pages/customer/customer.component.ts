import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith, switchMap} from "rxjs";
import {State} from "../../interface/state";
import {CustomHttpResponse} from "../../interface/customhttpresponse";
import {Customerstate} from "../../interface/customerstate";
import {DataState} from "../../enum/datastate.enum";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerState$: Observable<State<CustomHttpResponse<Customerstate>>>
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Customerstate>>(null)
  private isLoadingSubject = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoadingSubject.asObservable()
  readonly DataState = DataState
  private readonly CUSTOMER_ID: string = 'id'

  constructor(private activatedRoute: ActivatedRoute,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customerState$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.customerService.customer$(+params.get(this.CUSTOMER_ID))
          .pipe(
            map(response => {
              this.dataSubject.next(response)
              return {dataState: DataState.LOADED, appData: response}
            }),
            startWith({dataState: DataState.LOADING}),
            catchError((error: string) => {
              return of({dataState: DataState.ERROR, error})
            })
          )
      })
    );
  }

  updateCustomer(customerForm: NgForm): void {
    this.isLoadingSubject.next(true)
    this.customerState$ = this.customerService.updateCustomer$(customerForm.value)
      .pipe(
        map(response => {
          this.dataSubject.next({
            ...response,
            data: {
              ...response.data,
              customer: {
                ...response.data.customer,
                invoices: this.dataSubject.value.data.customer.invoices
              }
            }
          })
          this.isLoadingSubject.next(false)
          return {dataState: DataState.LOADED, appData: this.dataSubject.value}
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.isLoadingSubject.next(false)
          return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
        })
      )
  }
}
