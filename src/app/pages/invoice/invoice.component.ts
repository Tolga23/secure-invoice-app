import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith, switchMap} from "rxjs";
import {State} from "../../interface/state";
import {CustomHttpResponse} from "../../interface/customhttpresponse";
import {Customer} from "../../interface/customer";
import {User} from "../../interface/user";
import {DataState} from 'src/app/enum/datastate.enum';
import {Invoice} from "../../interface/invoice";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CustomerService} from "../../service/customer.service";

const INVOICE_ID = 'id'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoiceState$: Observable<State<CustomHttpResponse<Customer & Invoice & User>>>
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Customer & Invoice & User>>(null)
  private isLoadingSubject = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoadingSubject.asObservable()
  private currentPageSubject = new BehaviorSubject<number>(0)
  currentPage$ = this.currentPageSubject.asObservable()
  readonly DataState = DataState;

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.invoiceState$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.customerService.invoice$(+params.get(INVOICE_ID))
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

}
