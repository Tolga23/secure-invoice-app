import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../service/customer.service";
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {State} from "../../../interface/state";
import {CustomHttpResponse} from "../../../interface/customhttpresponse";
import {Customer} from 'src/app/interface/customer';
import {User} from "../../../interface/user";
import {DataState} from 'src/app/enum/datastate.enum';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-newinvoice',
  templateUrl: './newinvoice.component.html',
  styleUrls: ['./newinvoice.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewinvoiceComponent implements OnInit {
  newInvoiceState$: Observable<State<CustomHttpResponse<Customer[] & User>>>
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Customer[] & User>>(null)
  private isLoadingSubject = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoadingSubject.asObservable()
  readonly DataState = DataState

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.newInvoiceState$ = this.customerService.getInvoicesCustomer$()
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          return {dataState: DataState.LOADED, appData: response};
        }),
        startWith({dataState: DataState.LOADING}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR, error})
        })
      )
  }

  newInvoice(invoiceForm: NgForm) {
    this.dataSubject.next({...this.dataSubject.value, message: null})
    this.isLoadingSubject.next(true)
    this.newInvoiceState$ = this.customerService.createInvoices$(invoiceForm.value.customerId, invoiceForm.value)
      .pipe(
        map(response => {
          console.log(response)
          invoiceForm.reset({status: 'PENDING'})
          this.isLoadingSubject.next(false)
          this.dataSubject.next(response)
          return {dataState: DataState.LOADED, appData: this.dataSubject.value}
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.isLoadingSubject.next(false)
          return of({dataState: DataState.LOADED, error})
        })
      )

  }
}
