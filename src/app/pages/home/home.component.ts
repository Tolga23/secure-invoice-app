import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {State} from "../../interface/state";
import {CustomHttpResponse} from "../../interface/customhttpresponse";
import {Profile} from "../../interface/profile";
import {DataState} from "../../enum/datastate.enum";
import {UserService} from "../../service/user.service";
import {CustomerService} from "../../service/customer.service";
import {Page} from "../../interface/page";
import {User} from "../../interface/user";
import {Customer} from "../../interface/customer";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeState$: Observable<State<CustomHttpResponse<Page & User>>>
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Page & User>>(null)

  private isLoadingSubject = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoadingSubject.asObservable()

  private showLogsSubject = new BehaviorSubject<boolean>(false)
  showLogs$ = this.showLogsSubject.asObservable()

  private currentPageSubject = new BehaviorSubject<number>(0)
  currentPage$ = this.currentPageSubject.asObservable()

  readonly DataState = DataState

  constructor(private userService: UserService, private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.homeState$ = this.customerService.getCustomers$()
      .pipe(
        map(response => {
          console.log(response)
          this.dataSubject.next(response)
          return {dataState: DataState.LOADED, appData: response}
        }),
        startWith({dataState: DataState.LOADING}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR, error})
        })
      )
  }

  goToPage(pageNumber?: number): void {
    this.homeState$ = this.customerService.getCustomers$(pageNumber)
      .pipe(
        map(response => {
          this.dataSubject.next(response)
          this.currentPageSubject.next(pageNumber)
          return {dataState: DataState.LOADED, appData: response}
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          return of({dataState: DataState.LOADED, error, appData: this.dataSubject.value})
        })
      )
  }

  goToNextOrPreviousPage(direction?: string): void {
    this.goToPage(direction === 'next' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
  }

  selectCustomer(customer: Customer): void {

  }
}
