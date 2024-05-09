import {Customer} from "./customer";

/**
 * The Page interface represents a paginated set of Customer data.
 * Data comes from the getCustomers() method in the CustomerService.
 * It is typically used when retrieving large sets of data from a server in smaller chunks, or "pages".
 * This allows for more efficient data retrieval and improved performance.
 *
 * @interface
 * @property {Customer[]} content - An array of Customer objects that make up the current page of data.
 * @property {number} totalPages - The total number of pages available.
 * @property {number} totalElements - The total number of Customer objects across all pages.
 * @property {number} numberOfElements - The number of Customer objects on the current page.
 * @property {number} size - The size of each page (i.e., the number of Customer objects a page can contain).
 * @property {number} number - The current page number.
 */
export interface Page<T> {
  content: T[]
  totalPages: number
  totalElements: number
  numberOfElements: number
  size: number
  number: number
}
