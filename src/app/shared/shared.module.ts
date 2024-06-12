import {NgModule} from '@angular/core';

import {FormsModule} from "@angular/forms";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ExtractArrayValue} from "../pipes/extractvalue.pipe";

@NgModule({
  declarations: [
    ExtractArrayValue
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NgOptimizedImage,
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ExtractArrayValue,
    NgOptimizedImage,
  ]
})
export class SharedModule {
}
