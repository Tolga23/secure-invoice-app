import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith, switchMap} from "rxjs";
import {State} from "../../../interface/state";
import {CustomHttpResponse} from "../../../interface/customhttpresponse";
import {Customer} from "../../../interface/customer";
import {User} from "../../../interface/user";
import {DataState} from 'src/app/enum/datastate.enum';
import {Invoice} from "../../../interface/invoice";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CustomerService} from "../../../service/customer.service";
import {jsPDF as pdf} from "jspdf";

const INVOICE_ID = 'id'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceDetailComponent implements OnInit {

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

  exportAsPDF() {
    const fileName = `invoice-${this.dataSubject.value.data['invoice'].invoiceNumber}.pdf`;
    const doc = new pdf();
    doc.html(document.getElementById('invoice'), {margin: 5, windowWidth: 1000, width: 200,
      callback: (invoice) => invoice.save(fileName)});
  }
}
