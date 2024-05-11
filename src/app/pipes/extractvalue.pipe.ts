import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ExtractArrayValue'
})
export class ExtractArrayValue implements PipeTransform {

  /**
   * The `transform` method is a part of Angular's PipeTransform interface.
   * This method is used to transform input data into a desired output.
   *
   * @param {any} value - The input value that needs to be transformed.
   * @param {string} args - A string argument that determines the type of transformation to be applied on the input value.
   * @returns {any} - The transformed value.
   */
  transform(value: any, args: string): any {
    // Initialize a variable to hold the total value
    let total: number = 0;

    // If the argument is 'number', the function will create an array of numbers from 0 to the input value
    // and return this array.
    if (args === 'number') {
      let numberArray: number[] = [];
      for (let i = 0; i < value; i++) {
        numberArray.push(i);
      }
      return numberArray;
    }

    // If the argument is 'invoices', the function will assume that the input value is an array of invoices.
    // It will then calculate the total of all invoices in the array
    // and return this total as a string with two decimal places.
    if (args === 'invoices') {
      value.forEach(invoice => {
        total += invoice.total;
      })
      return total.toFixed(2);
    }

    // If the argument is neither 'number' nor 'invoices', the function will return 0.
    return 0;
  }

}
