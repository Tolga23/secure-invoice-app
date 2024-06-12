import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {CustomHttpResponse} from "../../../interface/customhttpresponse";
import {Page} from "../../../interface/page";
import {User} from "../../../interface/user";
import {DataState} from "../../../enum/datastate.enum";
import {State} from "../../../interface/state";
import {CustomerService} from "../../../service/customer.service";
import {NgForm} from "@angular/forms";
import {Customer} from "../../../interface/customer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customersState$: Observable<State<CustomHttpResponse<Page<Customer> & User>>>
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Page<Customer> & User>>(null)

  private isLoadingSubject = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoadingSubject.asObservable()

  private currentPageSubject = new BehaviorSubject<number>(0)
  currentPage$ = this.currentPageSubject.asObservable()

  readonly DataState = DataState;

  constructor(private router: Router, private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customersState$ = this.customerService.searchCustomer$()
      .pipe(
        map(response => {
          console.log(response)
          this.dataSubject.next(response)
          return {dataState: DataState.LOADED, appData: response}
        }),
        startWith({dataState: DataState.LOADED}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR, error})
        })
      )
  }

  searchCustomers(searchForm: NgForm): void {
    this.currentPageSubject.next(0)
    this.customersState$ = this.customerService.searchCustomer$(searchForm.value.name)
      .pipe(
        map(response => {
          this.dataSubject.next(response)
          return {dataState: DataState.LOADED, appData: response}
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR, error})
        })
      )
  }

  goToPage(pageNumber?: number, name?: string): void {
    this.customersState$ = this.customerService.searchCustomer$(name, pageNumber)
      .pipe(
        map(response => {
          this.dataSubject.next(response)
          this.currentPageSubject.next(pageNumber)
          return {dataState: DataState.LOADED, appData: response}
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          return of({dataState: DataState.LOADED, error, appData: this.dataSubject.value})
        })
      )
  }

  goToNextOrPreviousPage(direction?: string, name?: string) {
    this.goToPage(direction === 'next' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1, name)
  }

  selectCustomer(customer: Customer): void {
    this.router.navigate([`/customer`, customer.id])
  }
}
